const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookingsController");

router.post("/", async (req, res) => {
    // console.log("ROUTES -> BOOKIGS: ", req.body);

    const response = await controller.insertNewBooking(req.body);
});

module.exports = router;
