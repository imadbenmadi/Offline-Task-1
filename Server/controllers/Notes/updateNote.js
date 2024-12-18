const Notes = require("../../models/Notes");
const updateNote = async (req, res) => {
    try {
        const { Title, Description } = req.body;
        const note = await Notes.findOne({ id: req.params.id });
        if (note) {
            note.Title = Title;
            note.Description = Description;
            await note.save();
            res.json(note);
        } else {
            res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = updateNote;
