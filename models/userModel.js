const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/usersSql.js");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

//PH: 04/03/23 ADDED Firstname and lastname to token.
User.generateAuthToken = (
    firstname,
    lastname,
    type,
    email,
    credential_id,
    is_profile_established
) => {
    if (!firstname || !lastname || !type || !email) {
        console.log("error with data supplied generate token");
        throw new Error("There has been an error in generate auth token.");
    }

    const token = jwt.sign(
        {
            firstname,
            lastname,
            type,
            email,
            credential_id,
            is_profile_established,
        },
        "secretKey"
        // config.get("jwtPrivateKey")
    );

    return token;
};

User.create = async (email, hashedPassword, type) => {
    try {
        return { data: { user }, error: null };
    } catch (error) {
        return error;
    }
};

User.insertNewUserIntoCredentials = async (data) => {
    // destructure the data
    var firstname = data.inputFirstname;
    var lastname = data.inputLastname;

    var email = data.inputEmail;
    var password = data.inputPassword;
    var type = data.inputOwnerWasher;

    try {
        // 1.0 insert detail into the credentials table
        const result = await runSql(SQL.INSERT_USER_INTO_CREDENTIALS, [
            email,
            password,
            type,
        ]);

        // 2.0 obtain the credential id & is_profile_established that will be required to populate user token
        const userResults = await runSql(SQL.GET_USER_FROM_CREDENTIALS, [
            email,
        ]);

        var credential_id = userResults.rows[0].credential_id;
        var is_profile_established = userResults.rows[0].is_profile_established;

        // INSERT was successful
        if (result.rowCount === 1) {
            // obtain a token
            var token = User.generateAuthToken(
                firstname,
                lastname,
                type,
                email,
                credential_id,
                is_profile_established
            );

            // establsh the user object
            var user = {
                email: email,
                type: type,
                credential_id: credential_id,
                is_profile_established: is_profile_established,
            };

            return { data: { user, token }, error: null };
        }
    } catch (error) {
        return { data: null, error: error };
    }
};

module.exports = User;
