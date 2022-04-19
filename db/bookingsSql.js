module.exports = {
    CREATE_USER: "INSERT INTO USERS (email, password) VALUES($1, $2);",
    GET_BOOKINGS: "SELECT * FROM BOOKINGS;",
    // GJ: 11/03/2022
    INSERT_NEW_BOOKING:
        "INSERT INTO BOOKINGS (date, start_time, end_time, duration, is_cancelled, has_washer_completed, has_owner_confirmed, whom_cancelled, booking_status, booking_instructions, washer_assigned, washer_completed_proof, service_id, owner_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",

    // GJ: The below query gets all "bookings" for an individual owner that has completed car washes
    GET_OWNER_HISTORICAL_COMPLETIONS: `SELECT distinct bookings.booking_id,bookings.date, bookings.start_time, bookings.booking_status, bookings.has_owner_paid, services.service_type, services.service_fee, bookings.washer_completed_proof, washers.firstname, washers.lastname 
    FROM bookings, owners, washers, services 
    WHERE bookings.washer_assigned = washers.washer_id 
    AND booking_status = 'F' 
    AND bookings.service_id = services.service_id  
    AND bookings.owner_id = owners.owner_id 
    AND bookings.owner_id = $1;`,
    // GJ: FOR OWNER: get ASSIGNED JOBS
    GET_OWNER_ASSIGNED_JOBS: `SELECT distinct services.service_type, services.service_fee, bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, washers.firstname, washers.lastname 
    FROM bookings, owners, washers, services 
    WHERE bookings.washer_assigned = washers.washer_id 
    AND owners.vehicle_type::int = services.service_id
    AND booking_status = 'A' 
    AND bookings.owner_id = owners.owner_id 
    AND bookings.owner_id = $1;`,
    // GJ: FOR OWNER: get OPEN JOBS
    GET_OWNER_OPEN_JOBS: `SELECT distinct bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, washers.firstname, washers.lastname 
    FROM bookings LEFT JOIN washers on bookings.washer_assigned = washers.washer_id 
    WHERE booking_status = 'O' 
    AND bookings.owner_id = $1;`,

    // GJ: The below query gets all "bookings" for an individual walker that has completed.
    GET_WASHER_HISTORICAL_COMPLETIONS: `SELECT bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, services.service_type, services.service_fee, owners.suburb 
    FROM bookings, owners, services 
    WHERE bookings.owner_id = owners.owner_id
    AND owners.vehicle_type::int = services.service_id 
    AND booking_status = 'F' 
    AND bookings.washer_assigned = $1;`,

    GET_WASHER_ASSIGNED_JOBS: `SELECT bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, owners.firstname, owners.lastname, services.service_type, services.service_fee, owners.car_photo, owners.lat, owners.lng 
    FROM bookings, owners, services  
    WHERE booking_status = 'A'
    AND owners.vehicle_type::int = services.service_id
    AND bookings.owner_id = owners.owner_id 
    AND bookings.washer_assigned = $1`,

    // JUST GET ALL OPEN BOOKINGS
    GET_OPEN_BOOKINGS: `SELECT owners.suburb, owners.firstname, owners.lastname, owners.street_address, owners.state, owners.postcode, owners.lat, owners.lng, owners.vehicle_type, owners.car_photo, bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status FROM bookings, owners WHERE bookings.owner_id = owners.owner_id AND booking_status = 'O';`,
    // UPDATE A BOOKING WITH TEH WASHER ID
    UPDATE_BOOKING_STATUS_WITH_WASHER_INFO:
        "UPDATE bookings set booking_status = 'A', washer_assigned = $1 WHERE booking_id = $2;",

    UPDATE_BOOKING_AS_WASHER_COMPLETED_JOB:
        "UPDATE bookings set has_washer_completed = true,  booking_status = 'F', washer_completed_proof = $1 where booking_id = $2;",

    UPDATE_BOOKING_OWNER_VERIFIES_CAR_WASHED:
        "UPDATE bookings set has_owner_confirmed = true where washer_completed_proof = $1;",

    UPDATE_BOOKING_AS_OWNER_MAKES_PAYMENT:
        "UPDATE bookings SET has_owner_paid = true where booking_id = $1;",
};
