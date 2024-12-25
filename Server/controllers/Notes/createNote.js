const Notes = require("../../models/Notes");
const fs = require("fs");
const path = require("path");

const createNote = async (req, res) => {
    try {
        const { Title, Description, type } = req.body;
        const voice_note = req.file;

        if (type === "audio" && !voice_note) {
            return res.status(400).json({ msg: "Please upload an audio file" });
        }

        let note;

        if (type === "audio") {
            const allowedTypes = [
                "audio/mpeg",
                "audio/wav",
                "audio/ogg",
                "audio/webm",
            ];

            if (!allowedTypes.includes(voice_note.mimetype)) {
                return res.status(400).json({
                    msg: "Please upload a valid audio file (mp3, wav, ogg, webm)",
                });
            }

            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);
            const fileExtension = path.extname(voice_note.originalname);
            const targetFilename = `${uniqueSuffix}${fileExtension}`;
            const targetPath = path.join(
                __dirname,
                "../public/audios",
                targetFilename
            );

            // Move the file to the target directory
            fs.copyFileSync(voice_note.path, targetPath);
            fs.unlinkSync(voice_note.path);

            note = new Notes({
                userId: req.decoded.userId,
                type: "audio",
                Audio_Link: `http://localhost:3000/public/audios/${targetFilename}`,
            });
        } else {
            note = new Notes({
                Title,
                Description,
                userId: req.decoded.userId,
                type: "text",
            });
        }

        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = createNote;
