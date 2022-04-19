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

// update a booking with washer information and set the status
const updateBookingWithWasherInfo = async (data) => {
    try {
        const result = await Booking.updateBookingWithWasherInfo(data);
        return result;
    } catch (error) {
        return error;
    }
};

// update a booking with washer information as WASHER has completed job
const updateBookingAsWasherCompleted = async (data) => {
    console.log(
        "BOOKINGS CONTROLLER -> updateBookingAsWasherCompleted -> THJE DAT IS",
        data
    );
    try {
        const result = await Booking.updateBookingAsWasherCompleted(data);
        return result;
    } catch (error) {
        return error;
    }
};

const updateBookingAsOwnerVerfiedJobComplete = async (data) => {
    try {
        const result = await Booking.updateBookingAsOwnerVerfiedJobComplete(
            data
        );
        return result;
    } catch (error) {
        return error;
    }
};

const updateBookingAsOwnerMakesPayment = async (data) => {
    try {
        const result = await Booking.updateBookingAsOwnerMakesPayment(data);
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

// GET THE JOBS THAT ARE OPEN FOR THE WASHER
const getOpenBookings = async () => {
    try {
        const result = await Booking.getOpenBookings();
        return result;
    } catch (error) {
        return error;
    }
};

/****************OWNERS BELOW */

// GET COMPLETED JOBS FOR THE OWNER
const getOwnerCompletedBookings = async (data) => {
    try {
        const result = await Booking.getOwnerCompletedBookings(data);

        return result;
    } catch (error) {
        return error;
    }
};

const getOwnerOpenAndAssignedBookings = async (data) => {
    try {
        const result = await Booking.getOwnerOpenAndAssignedBookings(data);

        return result;
    } catch (error) {
        return error;
    }
};
const getOwnerOpenBookings = async (data) => {
    try {
        const result = await Booking.getOwnerOpenBookings(data);

        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewBooking,
    getOpenAndAssignedBookings,
    getCompletedBookings,
    getOpenBookings,
    updateBookingWithWasherInfo,
    updateBookingAsWasherCompleted,
    updateBookingAsOwnerVerfiedJobComplete,
    updateBookingAsOwnerMakesPayment,
    getOwnerCompletedBookings,
    getOwnerOpenAndAssignedBookings,
    getOwnerOpenBookings,
};
