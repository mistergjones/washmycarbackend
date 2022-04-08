module.exports = {
    CREATE_USER: "INSERT INTO USERS (email, password) VALUES($1, $2);",
    GET_BOOKINGS: "SELECT * FROM BOOKINGS;",
    // GJ: 11/03/2022
    INSERT_NEW_BOOKING:
        "INSERT INTO BOOKINGS (date, start_time, end_time, duration, is_cancelled, has_washer_completed, has_owner_confirmed, whom_cancelled, booking_status, booking_instructions, washer_assigned, washer_completed_proof, service_fee, our_commission, service_id, owner_id, vehicle_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)",

    // GJ: The below query gets all "bookings" for an individual owner that has completed car washes
    GET_OWNER_HISTORICAL_COMPLETIONS: `select distinct bookings.booking_id,bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, bookings.service_fee, vehicles.vehicle_type, washers.firstname, washers.lastname from bookings, owners, vehicles, washers WHERE bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = washers.washer_id AND booking_status = 'F' AND bookings.owner_id = $1;`,
    // GJ: FOR OWNER: get ASSIGNED JOBS
    GET_OWNER_ASSIGNED_JOBS: `select distinct bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, bookings.service_fee, vehicles.vehicle_type, washers.firstname, washers.lastname from bookings, owners, vehicles, washers WHERE bookings.washer_assigned = washers.washer_id AND bookings.vehicle_id = vehicles.vehicle_id AND booking_status = 'A' AND bookings.owner_id = $1;`,
    // GJ: FOR OWNER: get OPEN JOBS
    // GET_OWNER_OPEN_JOBS: `select distinct bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, bookings.service_fee, vehicles.vehicle_type FROM bookings, owners, vehicles WHERE bookings.vehicle_id = vehicles.vehicle_id AND booking_status = 'O' AND bookings.owner_id = $1;`,

    GET_OWNER_OPEN_JOBS: `select bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_time, bookings.booking_status, bookings.washer_completed_proof, bookings.service_fee, vehicles.vehicle_type, washers.firstname, washers.lastname from bookings LEFT JOIN washers on bookings.washer_assigned = washers.washer_id LEFT JOIN vehicles ON bookings.vehicle_id = vehicles.vehicle_id WHERE booking_status = 'O' AND bookings.owner_id = $1;`,

    // GJ: The below query gets all "bookings" for an individual walker that has completed.
    GET_WASHER_HISTORICAL_COMPLETIONS: `select bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, bookings.washer_completed_proof, bookings.service_fee, owners.suburb from bookings, owners, vehicles where bookings.owner_id = owners.owner_id AND bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = $1 AND booking_status = 'F';`,

    GET_WASHER_ASSIGNED_JOBS: `select bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, bookings.washer_completed_proof, bookings.service_fee from bookings, vehicles WHERE bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = $1 AND booking_status = 'A';`,

    // JUST GET ALL OPEN BOOKINGS
    GET_OPEN_BOOKINGS: `select owners.suburb, owners.firstname, owners.lastname, owners.street_address, owners.state, owners.postcode, owners.lat, owners.lng, bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, vehicles.vehicle_photo, bookings.service_fee from bookings, vehicles, owners WHERE bookings.owner_id = owners.owner_id AND bookings.vehicle_id = vehicles.vehicle_id AND booking_status = 'O';`,
    // UPDATE A BOOKING WITH TEH WASHER ID
    UPDATE_BOOKING_STATUS_WITH_WASHER_INFO:
        "UPDATE bookings set booking_status = 'A', washer_assigned = $1 where booking_id = $2",
};
