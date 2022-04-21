const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/washersSql.js");
const userSql = require("../db/usersSql.js");
const User = require("./userModel.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Washer = {};

// get the 3 types of incomes for the washeer
Washer.getAllIncomes = async (washer_id) => {
    // declare and object to hold all 3 results of data
    const allVerified = {};

    try {
        // #1
        const all_verified_and_paid_jobs = await runSql(
            SQL.GET_TOTAL_OF_COMPLETED_PAID_JOBS,
            [washer_id]
        );

        // #2
        const all_verfied_but_not_paid_yet = await runSql(
            SQL.GET_TOTAL_OF_CONFIRMED_BUT_NOT_PAID_JOBS,
            [washer_id]
        );

        //#3
        const only_verified_washer_completed_jobs = await runSql(
            SQL.GET_TOTAL_OF_WASHER_CONFIRMED_ONLY_BUT_NOT_OWNER_CONFIRMED_PAID_JOBS,
            [washer_id]
        );

        // #4 get actual total paid by each service type. For Pie Chart
        const actual_paid_by_each_service_type = await runSql(
            SQL.GET_TOTAL_OF_WASHER_ACTUAL_PAID_FOR_EACH_SERVICE_TYPE,
            [washer_id]
        );
        var totalByServiceType = actual_paid_by_each_service_type.rows;

        // now put all the results into an object
        if (actual_paid_by_each_service_type.rowCount === 0) {
            allVerified["totalByServiceType"] = "0.00";
        } else {
            allVerified.totalByServiceType = totalByServiceType;
        }

        if (all_verified_and_paid_jobs.rowCount === 0) {
            allVerified["totalPaidIncome"] = "0.00";
        } else {
            allVerified.totalPaidIncome =
                all_verified_and_paid_jobs.rows[0].sum;
        }

        if (all_verfied_but_not_paid_yet.rowCount === 0) {
            allVerified.totalVerifiedButNotPaid = "0.00";
        } else {
            allVerified.totalVerifiedButNotPaid =
                all_verfied_but_not_paid_yet.rows[0].sum;
        }
        if (only_verified_washer_completed_jobs.rowCount === 0) {
            allVerified.totalOnlyWasherVerified = "0.00";
        } else {
            allVerified.totalOnlyWasherVerified =
                only_verified_washer_completed_jobs.rows[0].sum;
        }

        console.log("SADASFADSFSDFASD", allVerified);

        return { data: { allVerified }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

// UPDATE SPECIFIC WASHER via EDIT PROFILE SREEN
Washer.updateWasherProfile = async (data) => {
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
        const result = await runSql(SQL.UPDATE_WASHER, [
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

Washer.getSpecificWasher = async (credentialId) => {
    try {
        const result = await runSql(SQL.GET_WASHER, [credentialId]);
        return { data: { result }, error: null };
    } catch (error) {
        return { data: null, error: error };
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
        inputLat,
        inputLng,
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
            inputLat,
            inputLng,
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
