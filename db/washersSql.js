//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB
module.exports = {
    INSERT_NEW_WASHER:
        "INSERT INTO WASHERS (firstname, lastname, street_address, suburb, state, postcode, mobile, email, dob, profile_photo, bank_name, bank_BSB, bank_acct_num, type, active_membership, profileUrl, stripeAccountId,acceptTerms, credential_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'W','TRUE','http://', 'acctSTRIPE', $14,$15);",
    GET_WASHER:
        "SELECT firstname, lastname, washer_id FROM washers WHERE credential_id = $1;",
};
