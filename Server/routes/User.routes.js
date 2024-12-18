const express = require("express");

const router = express.Router();

router.get("/:id", userController.getProfile);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
