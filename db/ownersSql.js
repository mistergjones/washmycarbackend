module.exports = {
    INSERT_NEW_OWNER:
        "INSERT INTO OWNERS (firstname, lastname, street_address, suburb, state, postcode, mobile, email, dob, car_photo, type, active_membership, credential_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'O','TRUE',$11);",
    GET_OWNER:
        "SELECT firstname, lastname, owner_id FROM owners WHERE credential_id = $1;",
};
