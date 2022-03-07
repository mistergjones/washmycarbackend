// REQUIRE MODEL
const Washer = require("../models/washersModel");

//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB

// CREATE NEW OWNER
const insertNewWasher = async (data) => {
    try {
        const result = await Washer.insertNewWasherIntoTable(data);
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertNewWasher,
};
