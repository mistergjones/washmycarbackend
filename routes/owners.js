const express = require("express");
const router = express.Router();

const controller = require("../controllers/ownersController");

router.post("/", async (req, res) => {
    const result = await controller.insertNewOwner(req.body);

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

// OWNER TABLE: THIS WILL RETREIVE 1 SPECIFIC OWNER BASED ON THEIR CREDENTIAL ID
router.get("/:credentialId", async (req, res) => {
    try {
        const owner = await controller.getOwnerByCredentialId(
            req.params.credentialId
        );
        res.send(owner.data.result.rows);
    } catch (error) {
        console.log(error);
        res.status(403).send(error);
    }
});
module.exports = router;
