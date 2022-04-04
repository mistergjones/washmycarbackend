const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/ownersSql.js");
const userSql = require("../db/usersSql.js");
const User = require("./userModel.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Owner = {};

// the below will update the specific owner by credential id whnen they edit their profile details
Owner.updateOwnerProfile = async (data) => {
    const {
        firstname,
        lastname,
        streetAddress,
        suburb,
        state,
        postcode,
        credential_id,
    } = data;
    try {
        const result = await runSql(SQL.UPDATE_OWNER, [
            firstname,
            lastname,
            streetAddress,
            suburb,
            state,
            postcode,
            credential_id,
        ]);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

Owner.getSpecificOwner = async (id) => {
    try {
        const result = await runSql(SQL.GET_OWNER, [id]);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

Owner.insertNewOwnerIntoTable = async (data) => {
    // destructure the data
    const {
        inputFirstname,
        inputLastname,
        inputStreetAddress,
        inputSuburb,
        inputState,
        inputPostcode,
        inputLat,
        inputLng,
        inputMobile,
        inputEmail,
        inputDOB,
        inputCarPhoto,
        credential_id,
    } = data;

    try {
        // 1.0 insert detail into the credentials table
        const result = await runSql(SQL.INSERT_NEW_OWNER, [
            inputFirstname,
            inputLastname,
            inputStreetAddress,
            inputSuburb,
            inputState,
            inputPostcode,
            inputLat,
            inputLng,
            inputMobile,
            inputEmail,
            "1900-01-01",
            inputCarPhoto,
            credential_id,
        ]);

        // update the is_profile_Established to TRUE in credentials
        const updateProfile = await runSql(
            userSql.UPDATE_USER_IS_PROFILE_ESTABLISHED,
            [credential_id]
        );

        // obtain the details of the owner
        const theSpecificOwner = await runSql(userSql.GET_USER_BY_EMAIL, [
            inputEmail,
        ]);

        var owner = theSpecificOwner.rows[0];

        if (updateProfile.rowCount === 1) {
            // obtain a token
            var token = User.generateAuthToken(
                inputFirstname,
                inputLastname,
                "O",
                inputEmail,
                credential_id,
                true
            );

            // console.log("THE TOKEN IS", token);
        }

        return { data: { owner, token }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Owner;
