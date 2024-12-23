const Notes = require("../../models/Notes");
const createNote = async (req, res) => {
    try {
        const { Title, Description } = req.body;

        const note = new Notes({
            Title,
            Description,
            UserId: req.decoded.userId,
        });
        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = createNote;
