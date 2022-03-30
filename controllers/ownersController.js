// REQUIRE MODEL
const Owner = require("../models/ownersModel");

// CREATE NEW OWNER
const insertNewOwner = async (data) => {
    try {
        const result = await Owner.insertNewOwnerIntoTable(data);
    } catch (error) {
        return error;
    }
};

const getOwnerByCredentialId = async (id) => {
    try {
        const result = await Owner.getSpecificOwner(id);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewOwner,
    getOwnerByCredentialId,
};
