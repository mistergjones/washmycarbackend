// REQUIRE MODEL
const User = require("../models/userModel.js");
// Require BCRYPT for encrypting the password
const bcrypt = require("bcryptjs");

// CREATE USER
const insertNewUser = async (data) => {
    try {
        const result = await User.insertNewUserIntoCredentials(data);

        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewUser,
};
