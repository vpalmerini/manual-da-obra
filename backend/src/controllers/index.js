const express = require("express");

const router = express.Router();

router.use("/users", require("./user.controller"));
router.use("/auth", require("./auth.controller"));

module.exports = router;
