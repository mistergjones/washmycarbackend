const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookingsController");

// INSERT A NEW BOOKING
router.post("/", async (req, res) => {
    // console.log("ROUTES -> BOOKIGS: ", req.body);

    const response = await controller.insertNewBooking(req.body);
});

router.get("/assigned/:credential_id", async (req, res) => {
    const response = await controller.getOpenAndAssignedBookings(req.params);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    // console.log(response.data.result.rows);

    res.send(response.data.result.rows);
});

router.get("/completed/:credential_id", async (req, res) => {
    const response = await controller.getCompletedBookings(req.params);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    // console.log(response.data.result.rows);

    res.send(response.data.result.rows);
});

module.exports = router;
