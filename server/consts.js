const ORDER_STATUS = "order_status";
const COUPON_REQUEST = "coupon_request";
const PRODUCT_AVAILABILITY = "product_availability";

const NO_MATCH_MESSAGE = "I'm sorry, I don't understand the request. I can primarily help with looking up order status (if you provide me with the email and order number), checking product availability, and offering promo codes. Can you rephrase your request please?";
const HUMAN_INTERVENTION_MESSAGE = "I'm sorry I'm able to help with the request. Let me transfer you over to a human agent.";

const DEFAULT_MODEL = "gpt-4o";
const DEFAULT_TEMPERATURE = 0.0;

const SYSTEM_INSTRUCTIONS = {
    role: "system",
    content: "You are a customer support agent for an apparel brand called Sierra Outfitters. Sierra Outfitters wants their agent to make frequent references to the outdoors. Think mountain emojis, enthusiastic phrases like “Onward into the unknown!” and more."
};

const INITIAL_PROMPT = `
    You are a customer service agent for an outdoor apparel brand called Sierra. For each of the three request categories (beneath #REQUEST_CATEGORIES) below, on a scale of 1-10 with 1 being the least confident and 10 being the most confident, please rate how confident you are that the customer request below (shown beneath #CUSTOMER_REQUEST:) falls into that request category. Your response should be in parseable JSON format (shown under #RESPONSE_FORMAT). Please only include JSON in the response, no markdown or backticks:

    #REQUEST_CATEGORIES:
    "order_status": The customer is requesting information about an order's status and/or tracking information.
    "coupon_request": The customer is requesting a coupon.
    "product_availability": The customer is requesting information on product availability.

    #RESPONSE_FORMAT:
    {
        "order_status": confidence level (1-10),
        "coupon_request": confidence level (1-10)
        "product_availability": confidence level (1-10)
    }

    #CUSTOMER_REQUEST:
    `;

const STATUS_UPDATE_PROMPT = `
    The customer is requesting information about an order's status and/or tracking information, which requires their email and order number. 
    
    If their messages contain those two pieces of information, your response should return them in parseable JSON format (shown under #SUCCESS_RESPONSE_FORMAT). 
    
    If their messages do not contain those two pieces of information, your response should return them in parseable JSON format (shown under #FAILURE_RESPONSE_FORMAT), with a message requesting the missing information corresponding to the "message" key.

    Please only include JSON in the response, no markdown or backticks.

    #SUCCESS_RESPONSE_FORMAT:
    {
        "success": true,
        "email": email,
        "orderNumber": order number
    }

    #FAILURE_RESPONSE_FORMAT:
    {
        "success": false,
        "message": message
    }
    `;

const PRODUCT_AVAILABILITY_PROMPT = `
    The customer is requesting information about a product's availability. 
    
    I am going to provide an array of Product JSON (under #PRODUCT_JSON), please only use the products in this array.
    
    Based on the customer's message, please select the product that you are most confident they are describing, along with a conifdence level of 1-10, with 1 being the least confident, and 10 being the most confident.

    If your confidence level is 9 or above, please respond with the JSON template under #SUCCESS_RESPONSE_FORMAT.

    If your confidence level is 8 or below, please respond with the JSON template under #FAILURE_RESPONSE_FORMAT. For the value corresponding to the "message" key, please write a message providing your best guess as to which Product's ProductName they are referring to, why you are uncertain, and requesting clarification.
    
    Please only include JSON in the response, no markdown or backticks.

    #SUCCESS_RESPONSE_FORMAT:
    {
        "success": true,
        "product": Product JSON,
        "confidenceLevel": confidence level
    }

    #FAILURE_RESPONSE_FORMAT:
    {
        "success": false,
        "message": message,
        "confidenceLevel": confidence level
    }

    #PRODUCT_JSON:
    `;

module.exports = { 
    SYSTEM_INSTRUCTIONS,
    ORDER_STATUS,
    COUPON_REQUEST,
    PRODUCT_AVAILABILITY,
    NO_MATCH_MESSAGE,
    HUMAN_INTERVENTION_MESSAGE,
    DEFAULT_MODEL,
    DEFAULT_TEMPERATURE,
    INITIAL_PROMPT,
    STATUS_UPDATE_PROMPT,
    PRODUCT_AVAILABILITY_PROMPT,
};