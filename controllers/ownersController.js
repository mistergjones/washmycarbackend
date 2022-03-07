// REQUIRE MODEL
const Owner = require("../models/ownersModel");

// CREATE NEW OWNER
const insertNewOwner = async (data) => {
    try {
        const result = await Owner.insertNewOwnerIntoTable(data);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewOwner,
};
