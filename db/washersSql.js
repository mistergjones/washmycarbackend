//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB
module.exports = {
    INSERT_NEW_WASHER:
        "INSERT INTO WASHERS (firstname, lastname, street_address, suburb, state, postcode, lat, lng, mobile, email, dob, profile_photo, bank_name, bank_BSB, bank_acct_num, type, active_membership, profileUrl, stripeAccountId,acceptTerms, credential_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'W','TRUE','http://', 'acctSTRIPE', $16,$17);",
    // get specific washer
    GET_WASHER: "SELECT * FROM washers WHERE credential_id = $1;",
    // update specific washer details
    UPDATE_WASHER:
        "UPDATE washers SET firstname = $1, lastname = $2, street_address=$3 ,suburb=$4, state=$5, postcode=$6  WHERE credential_id=$7;",
    GET_TOTAL_OF_COMPLETED_PAID_JOBS:
        "SELECT SUM(services.service_fee) from bookings INNER JOIN services ON bookings.service_id = services.service_id WHERE has_owner_paid='t' AND has_owner_confirmed='t' AND has_washer_completed='t' AND bookings.booking_status='F' AND washer_assigned=$1 GROUP BY washer_assigned;",
    // the below is where the washer has completed, owner has completed BUT NOT PAID YET
    GET_TOTAL_OF_CONFIRMED_BUT_NOT_PAID_JOBS:
        "SELECT SUM(services.service_fee) from bookings INNER JOIN services ON bookings.service_id = services.service_id WHERE has_washer_completed='t' AND has_owner_confirmed='t' AND has_owner_paid='f' AND bookings.booking_status='F' AND washer_assigned=$1 GROUP BY washer_assigned;",
    // the below we calculate the potential payment based on what the washer has actually copmleted with the OWNER NOT VERIFYING and NOT PAYING THE JOB YET
    GET_TOTAL_OF_WASHER_CONFIRMED_ONLY_BUT_NOT_OWNER_CONFIRMED_PAID_JOBS:
        "SELECT SUM(services.service_fee) from bookings INNER JOIN services ON bookings.service_id = services.service_id WHERE has_washer_completed='t' AND has_owner_confirmed='f' AND has_owner_paid='f' AND bookings.booking_status='F' AND washer_assigned=$1 GROUP BY washer_assigned;",
    // For specific washer, by each service type, what was actually paid
    GET_TOTAL_OF_WASHER_ACTUAL_PAID_FOR_EACH_SERVICE_TYPE:
        "select SUM(services.service_fee) as value, services.service_type as name from bookings, services where bookings.washer_assigned = $1 AND services.service_id = bookings.service_id GROUP BY services.service_type;",

    // "SELECT SUM(services.service_fee), services.service_type from bookings INNER JOIN services ON bookings.service_id = services.service_id WHERE has_owner_paid='t' AND has_owner_confirmed='t' AND has_washer_completed='t' AND bookings.booking_status='F' AND washer_assigned=$1 GROUP BY services.service_type;",
};
