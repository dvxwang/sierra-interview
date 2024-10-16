const axios = require('axios');
const dotenv = require('dotenv');
const { DEFAULT_MODEL, DEFAULT_TEMPERATURE } = require('./consts');

dotenv.config();

const fetchFromLLM = async (messages, models=[DEFAULT_MODEL], temperatures=[DEFAULT_TEMPERATURE]) => {
    try {
        // Allow aggregation of results from multiple models/temperatures
        const results = [];

        // Loop over all present models/temperatures, creating an API call for each combination
        for(const model of models){
            for(const temperature of temperatures){
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: model,
                        messages: messages,
                        temperature: temperature
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
        
                results.push(response.data.choices[0].message.content);
            }
        }

        // Return result if only 1 fetched
        if(results.length === 1){
            return results[0];
        } else {
            // Build concensus logic
        }
    } catch (error) {
        console.error('Error querying LLM:', error);
        return({ error: 'Failed to communicate with LLM' });
    }
}

module.exports = { fetchFromLLM }
