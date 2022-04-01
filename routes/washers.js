const express = require("express");
const router = express.Router();

const controller = require("../controllers/washersController");

//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB
router.get("/:credentialId", async (req, res) => {
    try {
        const washer = await controller.getWasherByCredentialId(
            req.params.credentialId
        );
        res.send(washer.data.result.rows);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
});

// INSERT A NEW WASHER
router.post("/", async (req, res) => {
    const result = await controller.insertNewWasher(req.body);

    if (result.data === null) {
        res.send(result.error.error);
    } else {
        // ***** Changes for jwt token in response
        res.header("x-auth-token", result.data.token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(result.data);

        // res.send(result);
        //   res.send(result);
    }
});

// UPDATE SPECIFIC WASHER
// washer TABLE: THIS WILL UPDATE THE SPECIFIC washer WHEN EDITING THEIR DETAILS
router.post("/:credentialId", async (req, res) => {
    try {
        const washer = await controller.updateWasherProfile(req.body);
        res.send(washer.data.result);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
});

module.exports = router;
