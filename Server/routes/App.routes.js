const express = require("express");
const authRoutes = require("./Auth.routes");
const userRoutes = require("./User.routes");
const NotesRoutes = require("./Notes.routes");
const authMiddleware = require("../middleware/Auth.middleware");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/Notes", authMiddleware, NotesRoutes);
router.use("/Profile", authMiddleware, userRoutes);

module.exports = router;
