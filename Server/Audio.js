const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const app = express();

app.post("/vocals", (req, res) => {
    const uploadDir = path.join(__dirname, "uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error processing upload:", err);
            return res.status(500).send("Error uploading file.");
        }

        const uploadedFile = files.vocal;
        if (uploadedFile) {
            const newFilePath = path.join(
                uploadDir,
                uploadedFile.originalFilename || "audio.webm"
            );
            fs.rename(uploadedFile.filepath, newFilePath, (renameErr) => {
                if (renameErr) {
                    console.error("Error renaming file:", renameErr);
                    return res.status(500).send("Error saving file.");
                }
                res.send("File uploaded successfully.");
            });
        } else {
            res.status(400).send("No audio file uploaded.");
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
