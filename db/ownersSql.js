module.exports = {
    INSERT_NEW_OWNER:
        "INSERT INTO OWNERS (firstname, lastname, street_address, suburb, state, postcode, mobile, email, dob, car_photo, type, active_membership, credential_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'O','TRUE',$11);",
    // get everything field ffor owner by their credential id
    GET_OWNER: "SELECT * FROM owners WHERE credential_id = $1;",
    // update specific owner details
    UPDATE_OWNER:
        "UPDATE owners SET firstname = $1, lastname = $2, street_address=$3 ,suburb=$4, state=$5, postcode=$6  WHERE credential_id=$7;",
};
