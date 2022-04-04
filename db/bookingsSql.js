module.exports = {
    CREATE_USER: "INSERT INTO USERS (email, password) VALUES($1, $2);",
    GET_BOOKINGS: "SELECT * FROM BOOKINGS;",
    // GJ: 11/03/2022
    INSERT_NEW_BOOKING:
        "INSERT INTO BOOKINGS (date, start_time, end_time, duration, is_cancelled, has_washer_completed, has_owner_confirmed, whom_cancelled, booking_status, booking_instructions, washer_assigned, washer_completed_proof, walker_assigned_id, service_fee, our_commission, service_id, owner_id, vehicle_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
    // GJ: The below query gets all "bookings" for an individual walker that has completed.
    GET_WASHER_HISTORICAL_COMPLETIONS: `select bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, bookings.washer_completed_proof, bookings.service_fee, owners.suburb from bookings, owners, vehicles where bookings.owner_id = owners.owner_id AND bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = $1 AND booking_status = 'F';`,

    // GJ: The below query gets all "bookings" for an individual walker that has completed.
    GET_OWNER_HISTORICAL_COMPLETIONS: `select bookings.booking_id,bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, bookings.washer_completed_proof, bookings.service_fee, washers.firtname from bookings, owners, vehicles, washers where bookings.owner_id = owners.owner_id AND bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = $1 AND booking_status = 'F';`,

    GET_WASHER_ASSIGNED_JOBS: `select bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, bookings.washer_completed_proof, bookings.service_fee from bookings, vehicles WHERE bookings.vehicle_id = vehicles.vehicle_id AND bookings.washer_assigned = $1 AND booking_status = 'A';`,

    // JUST GET ALL OPEN BOOKINGS
    GET_OPEN_BOOKINGS: `select owners.suburb, owners.firstname, owners.lastname, owners.street_address, owners.state, owners.postcode, owners.lat, owners.lng, bookings.booking_id, bookings.date, bookings.start_time, bookings.booking_status, vehicles.vehicle_type, vehicles.vehicle_photo, bookings.service_fee from bookings, vehicles, owners WHERE bookings.owner_id = owners.owner_id AND bookings.vehicle_id = vehicles.vehicle_id AND booking_status = 'O';`,
    // UPDATE A BOOKING WITH TEH WASHER ID
    UPDATE_BOOKING_STATUS_WITH_WASHER_INFO:
        "UPDATE bookings set booking_status = 'A', washer_assigned = $1 where booking_id = $2",

    // GJ: 09/02/22: The below query obtains all completed jobs done by a walker FOR THE OWNER to see. It now includes the map route proof for the owner to verify. It also contains the Stripe account for the walker.
    GET_COMPLETED_JOBS_FOR_OWNER:
        "SELECT bookings.walk_completed_proof, bookings.owner_id, bookings.date, bookings.start_time, bookings.service_fee, bookings.booking_status, services.service_stripe_fee_id, owners.credential_id, walkers.firstname, walkers.lastname, walkers.stripeAccountId, services.service_type FROM (((bookings INNER JOIN owners ON bookings.owner_id = owners.owner_id) INNER JOIN walkers ON bookings.walker_assigned = walkers.walker_id) INNER JOIN services ON bookings.service_id = services.service_id) WHERE bookings.booking_status = 'F' AND owners.credential_id = $1;",
    // GJ: 22/09: The below query obtains all ASSIGNED JOBS for the owner to see
    GET_ASSIGNED_JOBS_FOR_OWNER:
        "SELECT bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_Time, bookings.end_time, bookings.service_fee, bookings.booking_status, owners.credential_id, owners.suburb, walkers.firstname, walkers.lastname, walkers.overall_rating, walkers.suburb as walkers_suburb, services.service_type FROM (((bookings INNER JOIN owners ON bookings.owner_id = owners.owner_id) INNER JOIN walkers ON bookings.walker_assigned = walkers.walker_id) INNER JOIN services ON bookings.service_id = services.service_id) WHERE bookings.booking_status = 'A' AND owners.credential_id = $1;",
    GET_OPEN_JOBS_FOR_OWNER:
        "SELECT bookings.booking_id, bookings.owner_id, bookings.date, bookings.start_Time, bookings.end_time, bookings.service_fee, bookings.booking_status, owners.credential_id, owners.suburb, services.service_type FROM ((bookings INNER JOIN owners ON bookings.owner_id = owners.owner_id) INNER JOIN services ON bookings.service_id = services.service_id) WHERE bookings.booking_status = 'O' AND owners.credential_id = $1;",
    GET_OPEN_BOOKINGS_WALKER:
        "SELECT distinct booking_id, date, start_time, duration, end_time, suburb, service_type, services.service_fee, booking_status, lat, lng, dog_size FROM owners,bookings, services, dogs WHERE owners.owner_id = bookings.owner_id AND bookings.service_id = services.service_id AND booking_status = 'O' AND dogs.owner_id = owners.owner_id order by start_time desc;",
    GET_USER_BY_EMAIL: "SELECT user_id, email FROM USERS WHERE email = $1;",
    GET_BOOKING_BY_ID:
        "select bookings.date, start_time, owners.suburb, services.service_type, services.service_fee from bookings, services,owners where booking_id = $1 and bookings.service_id = services.service_id AND bookings.owner_id = owners.owner_id;",
    UPDATE_USER: "UPDATE USERS SET email = $1 WHERE user_id = $2;",
    DELETE_USER: "DELETE FROM USERS WHERE user_id = $1",
    GET_BOOKING_DETAILS_WALKER:
        "select dog_firstname, dog_breed, dog_size, dog_always_leashed  from bookings, dogs  where booking_id = $1 AND bookings.owner_id = dogs.owner_id;",
    GET_BOOKING_DETAILS_OWNER:
        "select walkers.firstname, walkers.suburb, walkers.overall_rating from bookings, walkers where bookings.walker_assigned = walkers.walker_id and booking_status = 'A' and booking_id = $1 ;",

    GET_SERVICE_DETAILS:
        "SELECT service_id, service_fee from services where service_type = $1",
    //GJ 15/09: The below updates a booking to CANCELLED (C) WHEN AN OWNER DOES THIS
    CANCEL_BOOKING: `UPDATE bookings SET is_cancelled = 'TRUE', whom_cancelled = $1, booking_status = 'C', walker_assigned = NULL WHERE booking_id = $2;`,
    //GJ 29/09: The below updates a booking to CANCELLED (C) WHEN A WALKER DOES THIS
    CANCEL_BOOKING_BY_WALKER: `UPDATE bookings SET is_cancelled = 'TRUE', whom_cancelled = $1, booking_status = 'O', walker_assigned = NULL WHERE booking_id = $2;`,
    // GJ: 29/09: FOR A WALKER, The below query updates the Booking to Finished (F) and sets the has_walker_completed BOOLEAN To true. It also includes the uploaded proof that the walker has completed the walk
    UPDATE_BOOKING_COMPLETED_BY_WALKER:
        "UPDATE bookings SET booking_status = 'F', has_walker_completed = 'TRUE', walk_completed_proof = $3 WHERE booking_id = $1 AND walker_assigned=$2;",
    UPDATE_BOOKING_STATUS:
        "UPDATE bookings set booking_status = $1, walker_assigned = $2 where booking_id = $3",
};
