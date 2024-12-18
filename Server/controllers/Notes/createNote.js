const Notes = require("../../models/Notes");
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Notes({
            title,
            content,
            user: req.decoded.userId,
        });
        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = createNote;
