const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

// insert a new user into Credentials table
router.post("/", async (req, res) => {
    const result = await controller.insertNewUser(req.body);

    console.log("THE REULST IS", result);

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

// enable a user to login
router.post("/login", async (req, res) => {
    // destructure
    const { inputEmail, inputPassword } = req.body;

    // GJ: IF SUCCESS ERROR WILL BE NULL AND WE WILL HAVE DATA.
    const {
        data: emailData,
        error: emailErrorMsg,
    } = await controller.getUserByEmail(inputEmail);

    if (emailErrorMsg) return res.status(400).send(emailErrorMsg);

    // COMPARE PASSWORD IF NO ERROR WILL RECEIVE TOKEN AND USER OBJECT WITHOUT PASSWORD.
    const {
        data: passwordData,
        error: passwordErrorMsg,
    } = controller.comparePassword(inputPassword, emailData.user);

    if (passwordErrorMsg) return res.status(400).send(passwordErrorMsg);

    // WE HAVE TOKEN AND VALID USER DATA RETURN VALID RESPONSE.
    res.header("x-auth-token", passwordData.token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(passwordData.user);
});

module.exports = router;
