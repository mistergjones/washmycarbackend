//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB
module.exports = {
    INSERT_NEW_WASHER:
        "INSERT INTO WASHERS (firstname, lastname, street_address, suburb, state, postcode, mobile, email, dob, profile_photo, bank_name, bank_BSB, bank_acct_num, type, active_membership, profileUrl, stripeAccountId,acceptTerms, credential_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'W','TRUE','http://', 'acctSTRIPE', $14,$15);",
    // get specific washer
    GET_WASHER: "SELECT * FROM washers WHERE credential_id = $1;",
    // update specific washer details
    UPDATE_WASHER:
        "UPDATE washers SET firstname = $1, lastname = $2, street_address=$3 ,suburb=$4, state=$5, postcode=$6  WHERE credential_id=$7;",
};
