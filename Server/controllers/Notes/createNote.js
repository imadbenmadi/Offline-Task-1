const Notes = require("../../models/Notes");
const fs = require("fs");
const path = require("path");

const createNote = async (req, res) => {
    try {
        const { Title, Description, type } = req.body;
        const { voice_note } = req.files;

        if (type === "audio" && !voice_note) {
            return res.status(400).json({ msg: "Please upload an audio file" });
        }

        let note;

        if (type === "audio") {
            // Ensure target directory exists
            const targetDir = path.join(__dirname, "../../public/audios");
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // Generate unique file name
            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);

            // Get file extension and validate it
            const fileExtension = path.extname(
                voice_note.name ||
                    voice_note.path ||
                    voice_note.originalname ||
                    ""
            );

            if (!fileExtension) {
                console.error("Uploaded file has no extension");
                return res
                    .status(400)
                    .json({ msg: "Uploaded file has no extension" });
            }

            // List of allowed extensions
            const allowedExtensions = [".mp3", ".wav", ".ogg", ".webm"];
            if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                return res
                    .status(400)
                    .json({ msg: `Invalid file type: ${fileExtension}` });
            }

            const targetFilename = `${uniqueSuffix}${fileExtension}`;
            const targetPath = path.join(targetDir, targetFilename);

            // Move file
            fs.copyFileSync(voice_note.path, targetPath);
            fs.unlinkSync(voice_note.path);

            note = new Notes({
                userId: req.decoded.userId,
                type: "audio",
                Audio_Link: `http://localhost:3000/audios/${targetFilename}`,
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
        console.error("Error:", error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = createNote;
