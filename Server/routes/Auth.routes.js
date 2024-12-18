const express = require("express");

const router = express.Router();

router.use("/check_Auth", require("../controllers/Auth/check_Auth"));
router.use("/Login", require("../controllers/Auth/Login"));
router.use("/Register", require("../controllers/Auth/Register"));
router.use("/Logout", require("../controllers/Auth/Logout"));
router.use("/Contact", require("../controllers/Contact"));
module.exports = router;
