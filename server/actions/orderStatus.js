const { CustomerOrders } = require("../database/CustomerOrders.js");

const ORDER_STATUS = {
    TRACKING: ["delivered", "in-transit"],
    NO_TRACKING: ["error", "fulfilled"]
}

const fetchOrderUpdate = (email, order) => {
    // "#" presence inconsistent
    if(order[0] !== "#"){
        order = "#" + order;
    }

    // Don't pass other customer's info into LLM (PII risk)
    const orders = CustomerOrders.filter((o) => o.Email === email && o.OrderNumber === order);
    return formatOrderMessage(orders);
}

const formatOrderMessage = (orders) => {
    if(!orders.length){
        return "I'm sorry, there is no record of that order with that email. Do you want me to check another order?"
    } else if(orders.length === 1){
        const order = orders[0];
        const orderStatus = order.Status;

        let message = `The status for Order ${order.OrderNumber} is ${orderStatus}.`;
        if(ORDER_STATUS.TRACKING.includes(orderStatus)){
            message += ` The tracking link is here: https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.TrackingNumber}`;
        }
        return message;
    } else {
        throw new Error("Invalid data! Multiple orders found!");
    }
}

module.exports = { fetchOrderUpdate };