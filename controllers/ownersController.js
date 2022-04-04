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

// update the specific owner details vai the EDIT profile form
const updateOwnerProfile = async (data) => {
    try {
        const result = await Owner.updateOwnerProfile(data);
        return result;
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
    updateOwnerProfile,
};
