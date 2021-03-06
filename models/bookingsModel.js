const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/bookingsSql.js");

const washerSql = require("../db/washersSql.js");
const Washer = require("./washersModel.js");

const ownerSql = require("../db/ownersSql");

const timeToBigInt = require("../helpers/timeToBigInt");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Booking = {};

Booking.insertNewBooking = async (data) => {
    // destructure the data
    const {
        whatVehicle,
        whatDate,
        whatTime,
        whatInstructions,
        credential_id,
    } = data;

    // the inputed date
    const day = whatDate.split("-")[2];
    const month = whatDate.split("-")[1];
    const year = whatDate.split("-")[0];
    const hour = whatTime.split(":")[0];
    const minute = whatTime.split(":")[1];
    const second = 30;
    // const convertedTime = new Date(year, month - 1, day, hour, minute, second);

    // need to conver the inputted date and time into a format for BIG INT
    const convertedTime = new Date(
        year +
            "-" +
            month +
            "-" +
            day +
            "T" +
            hour +
            ":" +
            minute +
            ":" +
            second
    );
    // convert the date and start time into a BIG INT
    var timeInBigInt =
        convertedTime.getTime() + convertedTime.getTimezoneOffset();

    try {
        // 1.0 Need the service id based on the owner's vehicle
        const ownerResult = await runSql(ownerSql.GET_OWNER, [credential_id]);

        const vehicle_type = ownerResult.rows[0].vehicle_type;
        //console.log("ADFAJFHA", ownerResult.rows[0].vehicle_type);

        // 2.0 insert detail into the credentials table
        const result = await runSql(SQL.INSERT_NEW_BOOKING, [
            whatDate,
            timeInBigInt,
            timeInBigInt + 3600000,
            "3600000",
            false,
            false,
            false,
            null,
            "O",
            whatInstructions,
            null,
            "no proof",
            vehicle_type,
            credential_id,
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// Update the booking with the WASHER assigned
Booking.updateBookingWithWasherInfo = async (data) => {
    // destructure the data
    // const { booking_id, credential_id } = data;
    const { booking_id, washer_id } = data;
    // console.log("WASHER INFO IS:", data);

    try {
        // 1. need to get the washer id based on teh supplied credential id
        // const washerResult = await runSql(washerSql.GET_WASHER, [
        //     credential_id,
        // ]);
        // const washer_id = washerResult.rows[0].washer_id;
        // 2. need to pass this infomration with the booking id to update teh booking
        // const result = await runSql(
        //     SQL.UPDATE_BOOKING_STATUS_WITH_WASHER_INFO,
        //     [washer_id, booking_id]
        // );
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
};

// UPDATE BOOKING THAT WASHER HAS COMPLETED JOB
Booking.updateBookingAsWasherCompleted = async (data) => {
    // destructure the data
    const { washer_completed_proof, booking_id } = data;

    try {
        const result = await runSql(
            SQL.UPDATE_BOOKING_AS_WASHER_COMPLETED_JOB,
            [washer_completed_proof, booking_id]
        );

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// OWNER VERFIES AND UPDATES THAT JOB IS COMPLETE
Booking.updateBookingAsOwnerVerfiedJobComplete = async (data) => {
    // destructure the data

    const { washer_completed_proof } = data;

    try {
        const result = await runSql(
            SQL.UPDATE_BOOKING_OWNER_VERIFIES_CAR_WASHED,
            [washer_completed_proof]
        );

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// OWNER VERFIES AND MAKES PAYMENT
Booking.updateBookingAsOwnerMakesPayment = async (data) => {
    // destructure the data

    const { booking_id } = data;

    try {
        const result = await runSql(SQL.UPDATE_BOOKING_AS_OWNER_MAKES_PAYMENT, [
            booking_id,
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// GET WASHER's open and assigned jobs for them
Booking.getOpenAndAssginedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_WASHER_ASSIGNED_JOBS, [
            data.washer_id,
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// GET THE WASHER's COMPLETED JOBS
Booking.getCompletedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_WASHER_HISTORICAL_COMPLETIONS, [
            data.washer_id,
        ]);

        // console.log("MODEL", result);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// GET ALL OPEN BOOKINGS
Booking.getOpenBookings = async () => {
    try {
        const result = await runSql(SQL.GET_OPEN_BOOKINGS, []);

        // console.log("MODEL", result);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

/******************OWNER BELOW *************/

// FOR THE OWNER: get the completed jobs for them
Booking.getOwnerCompletedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_OWNER_HISTORICAL_COMPLETIONS, [
            data,
        ]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// FOR THE OWNERL get the ASSIGNED jobs
Booking.getOwnerOpenAndAssignedBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_OWNER_ASSIGNED_JOBS, [data]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// FOR THE OWNER: get the open jobs who have not yet have a washer assigned
Booking.getOwnerOpenBookings = async (data) => {
    try {
        const result = await runSql(SQL.GET_OWNER_OPEN_JOBS, [data]);

        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Booking;
