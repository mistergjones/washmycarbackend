const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/washersSql.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Washer = {};

Washer.insertNewWasherIntoTable = async (data) => {
    console.log("WHAT DATA TO WE SEE", data);
    // destructure the data
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
        inputCarPhoto,
        inputBankName,
        inputBSB,
        inputAccountNumber,
        inputAcceptTerms,
        credential_id,
    } = data;

    try {
        // 1.0 insert detail into the credentials table
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
            inputCarPhoto,
            inputBankName,
            inputBSB,
            inputAccountNumber,
            inputAcceptTerms,
            credential_id,
        ]);

        return { data: { reult }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Washer;
