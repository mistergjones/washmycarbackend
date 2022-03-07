const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.post("/", async (req, res) => {
    const result = await controller.insertNewUser(req.body);

    if (result.data === null) {
        res.send(result.error.error);
    } else {
        // ***** Changes for jwt token in response
        res.header("x-auth-token", result.data.token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(result.data.user);

        // res.send(result);
    }
});

module.exports = router;
