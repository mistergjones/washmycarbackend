require("dotenv").config();
const express = require("express");
const app = express();

// GJ 03/03: required for client build stuff. USED FOR PRODUCTON
const path = require("path");
const fs = require("fs");
const https = require("https");

// const winston = require("winston");

// require("./startup/logging")();
// require("./startup/config")();
require("./startup/routes")(app);
// require("./startup/db")();
// require("./startup/validation")();
// require("./startup/debug")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Listening on Port ${port}...`)
);

module.exports = server;
