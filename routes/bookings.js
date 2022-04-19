const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookingsController");
const ownersController = require("../controllers/ownersController");

// INSERT A NEW BOOKING
router.post("/", async (req, res) => {
    // console.log("ROUTES -> BOOKIGS: ", req.body);
    const response = await controller.insertNewBooking(req.body);
    res.send(response.data.result);
});

// UPDATE A BOOKING WITH WASHER INFO
router.patch("/:booking_id", async (req, res) => {
    try {
        const result = await controller.updateBookingWithWasherInfo(req.body);
        res.send(result.data.result);
    } catch (error) {
        res.status(403).send(error);
    }
});

// UPDATE A BOOKING THAT OWNER VERIFIES COMPLETE
router.post("/ownerverifies", async (req, res) => {
    try {
        const result = await controller.updateBookingAsOwnerVerfiedJobComplete(
            req.body
        );

        res.send(result.data.result);
    } catch (error) {
        res.status(403).send(error);
    }
});

router.post("/ownermakespayment/:booking_id", async (req, res) => {
    try {
        const result = await controller.updateBookingAsOwnerMakesPayment(
            req.body
        );

        res.send(result.data.result);
    } catch (error) {
        res.status(403).send(error);
    }
});

// UPDATE A BOOKING WITH WASHER COMPLETED A WASH JOB
router.post("/:booking_id", async (req, res) => {
    try {
        const result = await controller.updateBookingAsWasherCompleted(
            req.body
        );
        console.log("ROUTE.POST / :bookingID", result);
        res.send(result.data.result);
    } catch (error) {
        res.status(403).send(error);
    }
});

// FOR OWNERS: this route will retrieve all completed job for a specific OWNER
router.get("/completedwashes/:credential_id", async (req, res) => {
    //1.0 need to get the owner id first
    const ownerInfo = await ownersController.getOwnerByCredentialId(
        req.params.credential_id
    );

    let owner_id = ownerInfo.data.result.rows[0].owner_id;

    // 2.0 Now get the completed jobs for the owner
    const response = await controller.getOwnerCompletedBookings(owner_id);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    res.send(response.data.result.rows);
});

// FOR OWNERS: which washers a wsher has bene asisgned to their job
router.get("/assignedwashes/:credential_id", async (req, res) => {
    //1.0 need to get the owner id first
    const ownerInfo = await ownersController.getOwnerByCredentialId(
        req.params.credential_id
    );

    let owner_id = ownerInfo.data.result.rows[0].owner_id;

    // 2.0 Now get the opem/assigned jobs for the owner
    const response = await controller.getOwnerOpenAndAssignedBookings(owner_id);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    // console.log(response.data.result.rows);

    res.send(response.data.result.rows);
});

// FOR OWNERS: which washers a wsher has bene asisgned to their job
router.get("/openwashes/:credential_id", async (req, res) => {
    //1.0 need to get the owner id first
    const ownerInfo = await ownersController.getOwnerByCredentialId(
        req.params.credential_id
    );

    let owner_id = ownerInfo.data.result.rows[0].owner_id;

    // 2.0 Now get the opem/assigned jobs for the owner
    const response = await controller.getOwnerOpenBookings(owner_id);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    // console.log(response.data.result.rows);

    res.send(response.data.result.rows);
});

// **********************WASHERS BELOW******************************//

// FOR WASHERS: Route to retrieve which bookings a WASHER id has been assigned to
router.get("/assigned/:washer_id", async (req, res) => {
    const response = await controller.getOpenAndAssignedBookings(req.params);

    // need to shorten the date
    response.data.result.rows.map((item) => {
        var shortenedDate = item.date.toISOString().split("T")[0];
        item["date"] = shortenedDate;
    });

    // console.log(response.data.result.rows);

    res.send(response.data.result.rows);
});

// FOR WASHERS: Route to retrieve which bookings a WASHER id has completed
router.get("/completed/:washer_id", async (req, res) => {
    const response = await controller.getCompletedBookings(req.params);
    if (response.data.result.rowCount == 0) {
        res.send({ data: response.data.result.rowCount });
    } else {
        // need to shorten the date
        response.data.result.rows.map((item) => {
            var shortenedDate = item.date.toISOString().split("T")[0];
            item["date"] = shortenedDate;
        });

        res.send(response.data.result.rows);
    }
});

router.get("/openlistings", async (req, res) => {
    try {
        const response = await controller.getOpenBookings();

        // need to shorten the date
        response.data.result.rows.map((item) => {
            var shortenedDate = item.date.toISOString().split("T")[0];
            item["date"] = shortenedDate;
        });

        res.send(response.data.result.rows);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
});

module.exports = router;
