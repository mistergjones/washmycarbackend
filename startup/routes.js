const express = require("express");

const users = require("../routes/users");
// const bookings = require("../routes/bookings");
// const dogs = require("../routes/dogs");
const owners = require("../routes/owners");
const washers = require("../routes/washers");

// GJ: 03/03/22 - Used for stripe
const bodyParser = require("body-parser");
var cors = require("cors");

// GJ: the bleow is really used for PRODUCTION
const path = require("path");
const fs = require("fs");
const https = require("https");

module.exports = function (app) {
    // GJ 03/03/22 - used for stripe
    app.use(cors());

    // transforms the text-based JSON input into JS-accessible variables under req.body.
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));

    // GJ 02/09. USED FOR DEPLOYMENT - UNCOMMENT THE BELOW LINE PRODUCTION
    // app.use(express.static(path.join(__dirname, "../client/build")));

    // GJ: COMMENT OUT THE BLEOW LINE FOR PRODUCTION
    app.use(express.static("public"));

    app.use("/api/users", users);
    // app.use("/api/bookings", bookings);
    // app.use("/api/dogs", dogs);
    app.use("/api/owners", owners);
    app.use("/api/washers", washers);
};
