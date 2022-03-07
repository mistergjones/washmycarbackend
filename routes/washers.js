const express = require("express");
const router = express.Router();

const controller = require("../controllers/washersController");

//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB

router.post("/", async (req, res) => {
    const result = await controller.insertNewWasher(req.body);

    if (result.data === null) {
        res.send(result.error.error);
    } else {
        res.send(result);
    }
});

module.exports = router;
