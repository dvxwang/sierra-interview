const { fetchFromLLM } = require('../api.js');
const { INITIAL_PROMPT } = require('../consts.js');

// Detects category of user request
const checkCategory = async (messages) => {
    // Limitation: Only looks at latest message to deduce category
    const latestMessage = messages[messages.length - 1];

    // If the latest message is not from use, then data is corrupted
    if(latestMessage.role !== "user"){
        throw new Error("Invalid message sequence");
    }

    return await getCategory(latestMessage);
};

const getCategory = async (message) => {
    // Response is a JSON laying out the confidence levels for each category
    const categoryConfidences = await fetchFromLLM([{
        role: "user",
        content: INITIAL_PROMPT + message.content
    }]);
    
    return checkCategoryConfidence(JSON.parse(categoryConfidences));
}

const checkCategoryConfidence = (confidences) => {
    const result = {
        high: {
            threshold: 7,
            categories: []
        },
        medium: {
            threshold: 4,
            categories: []
        },
        low: {
            categories: []
        },
    }

    // Classify categories into buckets based on confidence thresholds
    for(const category in confidences){
        const score = Number(confidences[category]);
        if(score >= result.high.threshold){
            result.high.categories.push(category);
        } else if(score >= result.medium.threshold){
            result.medium.categories.push(category);
        } else {
            result.low.categories.push(category);
        }
    }

    // Limitation: Only return result where there is 1 high confidence category, and no medium confidence categories
    if(result.high.categories.length === 1 && result.medium.categories.length === 0){
        return result.high.categories[0];
    } else {
        // Limitation: Avoid multiple, conflicting high confidence categories
        return null;
    }
}

module.exports = { checkCategory }