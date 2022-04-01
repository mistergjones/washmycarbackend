// REQUIRE MODEL
const Washer = require("../models/washersModel");

//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB

// CREATE NEW Washer
const insertNewWasher = async (data) => {
    try {
        const result = await Washer.insertNewWasherIntoTable(data);
        return result;
    } catch (error) {
        return error;
    }
};

// UPDATE SPECIFIC WASHER VIA THEIR EDIT PROFILE
// update the specific Washer details vai the EDIT profile form
const updateWasherProfile = async (data) => {
    try {
        const result = await Washer.updateWasherProfile(data);
        return result;
    } catch (error) {
        return error;
    }
};

// get specific washer
const getWasherByCredentialId = async (id) => {
    try {
        const result = await Washer.getSpecificWasher(id);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewWasher,
    getWasherByCredentialId,
    updateWasherProfile,
};
