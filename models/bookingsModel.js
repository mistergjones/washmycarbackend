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
            false,
            false,
            false,
            "O",
            whatInstructions,
            "1234",
            "no proof",
            "2",
            "49",
            "83",
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Booking;
