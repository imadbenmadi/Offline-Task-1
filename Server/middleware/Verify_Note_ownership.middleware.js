const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../Models/Users");
const Notes = require("../Models/Notes");
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
        if (Note.userId !== decoded.userId) {
            return res.status(401).json({
                message: "unauthorized : cannot access this Note ",
            });
        }
        req.decoded = decoded;
        req.Note = Note;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid tokens" });
    }
};

module.exports = Verify_Note_ownership;
