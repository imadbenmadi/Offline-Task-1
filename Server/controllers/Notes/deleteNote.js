const Notes = require("../../models/Notes");
const fs = require("fs");
const path = require("path");

const deleteNote = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ msg: "Note ID is required" });
        }
        const { id } = req.params;
        let note = req.Note;
        if (!req.Note)
            // Find the note by ID
            note = await Notes.findById(id);

        if (!note) {
            return res.status(200).json({ msg: "Note not found" });
        }


        // If the note has an audio file, delete it from the server
        if (note.type === "audio" && note.Audio_Link) {
            const audioPath = path.join(
                __dirname,
                "../../public/audios",
                path.basename(note.Audio_Link)
            );

            if (fs.existsSync(audioPath)) {
                fs.unlinkSync(audioPath);
            }
        }

        // Delete the note from the database
        await Notes.findByIdAndDelete(id);

        res.json({ msg: "Note deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = deleteNote;
