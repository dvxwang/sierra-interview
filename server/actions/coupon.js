const crypto = require("crypto");
const { toZonedTime } = require('date-fns-tz');
const { isWithinInterval } = require('date-fns');

const Coupon = require("../models/Coupon.js");

const COUPON_REQUEST = "Early Risers Promotion";

const fetchCoupon = (chat, email) => {
    return formatCouponMessage(chat, email);
}

const formatCouponMessage = (chat, email) => {
    // Check if messages contains password
    const containsSecretCode = chat.toLowerCase().includes(COUPON_REQUEST.toLowerCase());
    
    // Check if current time is within window (note, may be delayed from when user asked initial message by a few seconds)
    const withinTimeWindow = timeCheck();

    if(containsSecretCode && withinTimeWindow){
        // Random code generated
        const code = crypto.randomBytes(15).toString('hex');

        const coupon = new Coupon(code);
        // Coupon will be saved to Coupon db

        return `Enjoy your promo code! Code: ${code}`
    } else {
        return "I'm sorry, but there are no promotions currently available."
    }
}

const timeCheck = () => {

    // Get the current time in Pacific Time
    const pacificTimeZone = 'America/Los_Angeles';
    const now = new Date();
    const currentPacificTime = toZonedTime(now, pacificTimeZone);

    // Define the time interval for 8:00 AM to 10:00 AM in Pacific Time
    const start = toZonedTime(new Date(), pacificTimeZone);
    start.setHours(8, 0, 0, 0); // 8:00 AM
    const end = toZonedTime(new Date(), pacificTimeZone);
    end.setHours(10, 0, 0, 0); // 10:00 AM

    // Return whether the current time is within the interval
    return isWithinInterval(currentPacificTime, { start, end });
}

module.exports = { fetchCoupon };