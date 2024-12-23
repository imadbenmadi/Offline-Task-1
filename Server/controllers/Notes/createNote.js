const Notes = require("../../models/Notes");
const createNote = async (req, res) => {
    try {
        const { Title, Description, type } = req.body;
        let note;
        if (type === "audio" && !req.file) {
            return res.status(400).json({ msg: "Please upload an audio file" });
        }
        if (type === "audio") {
            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);
            note = new Notes({
                userId: req.decoded.userId,
                type: "audio",
                Audio_Link: `http://localhost:3000/uploads/${uniqueSuffix}-${req.file.originalname}`,
            });
        }
        note = new Notes({
            Title,
            Description,
            userId: req.decoded.userId,
            type: "text",
        });
        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
module.exports = createNote;
