// REQUIRE MODEL
const Booking = require("../models/bookingsModel");

// CREATE NEW BOOKING
const insertNewBooking = async (data) => {
    try {
        const result = await Booking.insertNewBooking(data);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewBooking,
};
