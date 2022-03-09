const express = require("express");
const router = express.Router();

const controller = require("../controllers/ownersController");

router.post("/", async (req, res) => {
    const result = await controller.insertNewOwner(req.body);

    console.log("INSERTING A NEW OWNER", result);

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

    // if (result.data === null) {
    //     res.send(result.error.error);
    // } else {
    //     res.send(result);
    // }
});

module.exports = router;
