const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.Controller");

router.get("/", userController.getProfile);
router.delete("/", userController.deleteProfile);

module.exports = router;
