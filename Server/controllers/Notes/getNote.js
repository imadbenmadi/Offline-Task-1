const Notes = require("../../models/Notes");
const getNote = async (req, res) => {
    try {
        const note = await Notes.findOne({ id: req.params.id });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = getNote;
