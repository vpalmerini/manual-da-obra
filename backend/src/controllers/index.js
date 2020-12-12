const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.controller"));
router.use("/users", require("./user.controller"));
router.use("/constructions", require("./construction.controller"));
router.use("/constructions", require("./system.controller"));

module.exports = router;
