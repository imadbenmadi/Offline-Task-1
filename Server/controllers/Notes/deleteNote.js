const Notes = require("../../models/Notes");
const deleteNote = async (req, res) => {
    try {
        await Notes.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Note Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = deleteNote;
