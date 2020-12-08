const express = require("express");

const router = express.Router();

router.use("/users", require("./user.controller"));

module.exports = router;
