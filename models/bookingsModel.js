const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/bookingsSql.js");
// const userSql = require("../db/usersSql.js");
// const User = require("./userModel.js");

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

Booking.getOpenAndAssginedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_WASHER_ASSIGNED_JOBS, [
            data.credential_id,
        ]);

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

module.exports = Booking;
