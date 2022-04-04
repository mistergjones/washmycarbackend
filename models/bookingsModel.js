const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/bookingsSql.js");

const washerSql = require("../db/washersSql.js");
const Washer = require("./washersModel.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Booking = {};

Booking.insertNewBooking = async (data) => {
    // destructure the data
    const { whatVehicle, whatDate, whatTime, whatInstructions } = data;

    console.log("The Data is:", data);

    try {
        // 1.0 insert detail into the credentials table
        const result = await runSql(SQL.INSERT_NEW_BOOKING, [
            whatDate,
            whatTime,
            whatTime,
            "45",
            false,
            false,
            false,
            "betty",
            "O",
            whatInstructions,
            "1",
            "http://www.news.com.au",
            "1",
            "10.20",
            "1.20",
            "2",
            "1",
            "8",
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

Booking.updateBookingWithWasherInfo = async (data) => {
    // destructure the data
    const { booking_id, credential_id } = data;

    try {
        // 1. need to get the washer id based on teh supplied credential id
        const washerResult = await runSql(washerSql.GET_WASHER, [
            credential_id,
        ]);
        const washer_id = washerResult.rows[0].washer_id;
        // 2. need to pass this infomration with the booking id to update teh booking
        const result = await runSql(
            SQL.UPDATE_BOOKING_STATUS_WITH_WASHER_INFO,
            [washer_id, booking_id]
        );
        // 3. need to pass back the remainint open bookings
        // const result = await runSql(SQL.GET_OPEN_BOOKINGS, []);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }

    try {
        console.log("D OW AHDSFJASHFJDALHFJA");
    } catch (error) {}
};
Booking.getOpenAndAssginedBookings = async (data) => {
    console.log("CREDENTIAL IS is", data);
    try {
        const result = await runSql(SQL.GET_WASHER_ASSIGNED_JOBS, [
            data.credential_id,
        ]);

        console.log("The result is: ", result.rows);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

Booking.getCompletedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_WASHER_HISTORICAL_COMPLETIONS, [
            data.credential_id,
        ]);

        // console.log("MODEL", result);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

Booking.getOpenBookings = async () => {
    try {
        const result = await runSql(SQL.GET_OPEN_BOOKINGS, []);

        // console.log("MODEL", result);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Booking;
