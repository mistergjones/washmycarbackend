const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/ownersSql.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const Owner = {};

Owner.insertNewOwnerIntoTable = async (data) => {
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
            inputMobile,
            inputEmail,
            "1900-01-01",
            inputCarPhoto,
            credential_id,
        ]);

        return { data: { reult }, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = Owner;
