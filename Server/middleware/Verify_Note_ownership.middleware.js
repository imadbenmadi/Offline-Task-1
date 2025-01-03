const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../models/Users");
const Notes = require("../models/Notes");
const Verify_Note_ownership = async (req, res, next) => {
    try {
        let Note = await Notes.findOne({
            where: { id: req.params.id },
        });
        if (!Note) {
            return res.status(401).json({
                message: "unauthorized : Invalid Note ",
            });
        }
        if (Note.userId !== req.decoded.userId) {
            return res.status(401).json({
                message: "unauthorized : cannot access this Note ",
            });
        }

        req.Note = Note;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid tokens" });
    }
};

module.exports = Verify_Note_ownership;
