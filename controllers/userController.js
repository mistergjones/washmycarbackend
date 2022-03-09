// REQUIRE MODEL
const User = require("../models/userModel.js");
// Require BCRYPT for encrypting the password
const bcrypt = require("bcryptjs");

// CREATE USER
const insertNewUser = async (data) => {
    var firstname = data.inputFirstname;
    var lastname = data.inputLastname;

    var email = data.inputEmail;
    var password = data.inputPassword;
    var type = data.inputOwnerWasher;

    try {
        // 1.0 need to hash the password before insertion
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);

        // const result = await User.insertNewUserIntoCredentials(data);
        const result = await User.insertNewUserIntoCredentials(
            firstname,
            lastname,
            email,
            hashedPassword,
            type
        );

        return result;
    } catch (error) {
        return error;
    }
};

// used to get a user from the crednetial table
const getUserByEmail = async (email) => {
    try {
        const { data, error } = await User.getUserByEmail(email);

        if (error) return { data: null, error };
        // Check we have user and is only one entry
        const { user } = data;

        if (!user || user.length !== 1) {
            return { data: null, error: "EMAIL NOT RETRIEVED" };
        }

        // PH : 14/07 21 GET First Name & LAST Name of owner or walker.
        const {
            data: userInfo,
            error: userInfoError,
        } = await User.getUserDetails(user[0].credential_id, user[0].type);

        if (userInfoError) {
            return { data: null, error: userInfoError };
        }

        return {
            data: { user: { ...user[0], ...userInfo.userDetails } },
            error: null,
        };
    } catch (error) {
        console.log("Error from getUserByEmail()", error);
        return { data: null, error };
    }
};

const comparePassword = (requestPassword, dbUser) => {
    let token = null;
    let error = null;
    let user = null;

    // Compare passwords if match create token else create error message
    if (bcrypt.compareSync(requestPassword, dbUser.password)) {
        const {
            credential_id,
            type,
            email,
            is_profile_established,
            firstname,
            lastname,
        } = dbUser;

        token = User.generateAuthToken(
            firstname,
            lastname,
            type,
            email,
            credential_id,
            is_profile_established
        );

        user = {
            credential_id,
            email,
            type,
            is_profile_established,
            firstname,
            lastname,
        };
    } else {
        console.log("no match");
        // We don't have a match
        error = "Email Password Error!";
    }

    return { data: { token, user }, error };
};

module.exports = {
    insertNewUser,
    getUserByEmail,
    comparePassword,
};
