const jwt = require("jsonwebtoken");
const { runSql } = require("../db/runsSql");
const SQL = require("../db/usersSql.js");
const washerSql = require("../db/washersSql");
const ownerSql = require("../db/ownersSql");

// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

//GJ: 04/03/23 ADDED Firstname and lastname to token.
// NEed to udpate is_profile_established once an owner/washer is inserted.
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

User.getUserByEmail = async (email) => {
    try {
        const { rows: user } = await runSql(SQL.GET_USER_BY_EMAIL, [email]);
        return { data: { user: user }, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
};

// this will return a user's information
User.getUserDetails = async (id, type) => {
    // console.log("id = " + id, " type = " + type);
    let info = {};
    let error = null;

    if (type === "W") {
        const { rows } = await runSql(washerSql.GET_WASHER, [id]);

        // SQL CALL SHOULD RETURN ONE ROW
        if (rows.length !== 1) {
            error = "error from get user details.";
        } else {
            info = rows[0];
        }
    } else if (type === "O") {
        //TODO:
        const { rows } = await runSql(ownerSql.GET_OWNER, [id]);

        // SQL CALL SHOULD RETURN ONE ROW
        if (rows.length !== 1) {
            error = "error from get user details.";
        } else {
            info = rows[0];
        }
    }

    return { data: { userDetails: info }, error };
};

User.insertNewUserIntoCredentials = async (
    firstname,
    lastname,
    email,
    hashedPassword,
    type
) => {
    try {
        // 1.0 insert detail into the credentials table

        const result = await runSql(SQL.INSERT_USER_INTO_CREDENTIALS, [
            email,
            hashedPassword,
            type,
        ]);

        // 2.0 obtain the credential id & is_profile_established that will be required to populate user token
        const userResults = await runSql(SQL.GET_USER_BY_EMAIL, [email]);

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
