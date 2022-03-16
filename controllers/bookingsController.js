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

const getOpenAndAssignedBookings = async (data) => {
    try {
        const result = await Booking.getOpenAndAssginedBookings(data);

        return result;
    } catch (error) {
        return error;
    }
};
const getCompletedBookings = async (data) => {
    try {
        const result = await Booking.getCompletedBookings(data);

        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewBooking,
    getOpenAndAssignedBookings,
    getCompletedBookings,
};
