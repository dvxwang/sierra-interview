const express = require("express");

const { checkCategory } = require("./actions/category.js");
const { fetchFromLLM } = require("./api.js");
const { formatSystemInstructions, formatModelResponse } = require("./actions/formatters.js");
const { NO_MATCH_MESSAGE, HUMAN_INTERVENTION_MESSAGE } = require("./consts.js");

const app = express();
app.use(express.json())

app.post("/api", async (req, res) => {
    // Messages displayed in end user's chat
    const messages = req.body; 
    console.log('Messages received: ', messages);
    // Detect the category of the request
    const category = await checkCategory(messages);

    // If no serviceable category is detected
    if(category === null){

        // Get previous instances where request could not be handled
        const previousNoHandles = messages.filter((m) => m.content === NO_MATCH_MESSAGE);

        // Refer to human agent if request repeatedly cannot be handled
        if(previousNoHandles.length >= 2){
            res.json({data: [...messages, {
                role: "assistant",
                content: HUMAN_INTERVENTION_MESSAGE
            }]});       
        } else {
            // Ask end user to rephrase
            res.json({data: [...messages, {
                role: "assistant",
                content: NO_MATCH_MESSAGE
            }]});    
        }
        return;
    }
    
    // Add category-specific language to the prompt
    const systemMessages = formatSystemInstructions(category, messages);

    let response;
    // "Null" indicates LLM is not needed. Otherwise, query LLM for proper response
    if(systemMessages !== null){
        response = await fetchFromLLM(systemMessages);
    }

    // Format the response into user-friendly format
    const modelMessage = formatModelResponse(category, messages, response);
    res.json({data: [...messages, modelMessage]});
})

app.listen(5000, () => console.log("Server started on port 5000"));