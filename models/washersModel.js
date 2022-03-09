const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/washersSql.js");
const userSql = require("../db/usersSql.js");
const User = require("./userModel.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Washer = {};

Washer.getWasher = async (credentialId) => {
    try {
        // console.log("***************************");
        // console.log("washer.getWasher ->", credentialId);
        const { rows } = await runSql(SQL.GET_WASHER, [credentialId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        return error;
    }
};

Washer.insertNewWasherIntoTable = async (data) => {
    const {
        inputFirstname,
        inputLastname,
        inputStreetAddress,
        inputSuburb,
        inputState,
        inputPostcode,
        inputMobile,
        inputEmail,
        inputDOB,
        inputProfilePhoto,
        inputBankName,
        inputBSB,
        inputAccountNumber,
        inputAcceptTerms,
        credential_id,
    } = data;

    try {
        // 1.0 insert detail into the WASHERS table
        const result = await runSql(SQL.INSERT_NEW_WASHER, [
            inputFirstname,
            inputLastname,
            inputStreetAddress,
            inputSuburb,
            inputState,
            inputPostcode,
            inputMobile,
            inputEmail,
            "1900-01-01",
            inputProfilePhoto,
            inputBankName,
            inputBSB,
            inputAccountNumber,
            inputAcceptTerms,
            credential_id,
        ]);

        // update the is_profile_Established to true in credentials
        const updateProfile = await runSql(
            userSql.UPDATE_USER_IS_PROFILE_ESTABLISHED,
            [credential_id]
        );

        const theSpecificWasher = await runSql(userSql.GET_USER_BY_EMAIL, [
            inputEmail,
        ]);

        var washer = theSpecificWasher.rows[0];

        if (updateProfile.rowCount === 1) {
            // obtain a token
            var token = User.generateAuthToken(
                inputFirstname,
                inputLastname,
                "W",
                inputEmail,
                credential_id,
                true
            );

            console.log("THE TOKEN IS", token);
        }

        // generate teh updated auth token

        return { data: { washer, token }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Washer;
