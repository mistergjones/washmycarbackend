const express = require("express");
const router = express.Router();

const controller = require("../controllers/ownersController");

router.post("/", async (req, res) => {
    const result = await controller.insertNewOwner(req.body);

    if (result.data === null) {
        res.send(result.error.error);
    } else {
        res.send(result);
    }
});

module.exports = router;
