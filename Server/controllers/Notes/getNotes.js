const Notes = require("../../models/Notes");
const getNotes = async (req, res) => {
    try {
        let notes = [];
        notes = await Notes.findAll({ user: req.decoded.userId });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = getNotes;
