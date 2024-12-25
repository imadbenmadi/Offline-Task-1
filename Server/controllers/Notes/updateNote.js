const Notes = require("../../models/Notes");
const updateNote = async (req, res) => {
    try {
        const { Title, Description } = req.body;
        console.log(req.body);
        let note;
        note = req.Note;
        if (!note) note = await Notes.findOne({ id: req.params.id });
        if (note) {
            note.Title = Title;
            note.Description = Description;
            await note.save();
            res.json(note);
        } else if (note.type !== "text") {
            return res.status(400).send("can only update text notes");
        } else {
            res.status(404).send("Note not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = updateNote;
