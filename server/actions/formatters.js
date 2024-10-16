const { fetchProduct, getProductList } = require('./inventory.js');
const { fetchOrderUpdate } = require('./orderStatus.js');
const { fetchCoupon } = require('./coupon.js');
const { SYSTEM_INSTRUCTIONS, STATUS_UPDATE_PROMPT, ORDER_STATUS, COUPON_REQUEST, PRODUCT_AVAILABILITY, PRODUCT_AVAILABILITY_PROMPT } = require('../consts.js');

const formatSystemInstructions = (category, messages) => {

    // Start with base system instructions
    const updatedSystemInstructions = {...SYSTEM_INSTRUCTIONS};

    // Add category-specific system instructions
    if(category === ORDER_STATUS){
        updatedSystemInstructions.content += STATUS_UPDATE_PROMPT;
    } else if(category === PRODUCT_AVAILABILITY){
        const productList = getProductList();
        updatedSystemInstructions.content += (PRODUCT_AVAILABILITY_PROMPT + JSON.stringify(productList));
    } else if(category === COUPON_REQUEST){
        return null;
    }

    return [updatedSystemInstructions, ...messages];
}

// Translates model response into customer-friendly messages
const formatModelResponse = (category, messages, response = JSON.stringify({success: true})) => {
    const responseJSON = JSON.parse(response);
    const modelResponse = {
        role: "assistant",
    };

    if(responseJSON.success){
        if(category === ORDER_STATUS){
            if(responseJSON.email && responseJSON.orderNumber){
                const orderMessage = fetchOrderUpdate(responseJSON.email, responseJSON.orderNumber);
                modelResponse.content = orderMessage;
            } else {
                throw new Error("Invalid response format");
            }
        } else if(category === PRODUCT_AVAILABILITY){
            if(responseJSON.product){
                const productMessage = fetchProduct(responseJSON.product.ProductName);
                modelResponse.content = productMessage;
            } else {
                throw new Error("Invalid response format");
            }
        } else if(category === COUPON_REQUEST){
            const latestMessage = messages[messages.length-1];
            modelResponse.content = fetchCoupon(latestMessage.content);
        }
    } else {
        // Assumption is response returns a message requesting the missing information
        modelResponse.content = responseJSON.message;
    }

    return modelResponse;
}

module.exports = { formatSystemInstructions, formatModelResponse }