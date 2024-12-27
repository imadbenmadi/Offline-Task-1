const Users = require("../../models/Users");
const Notes = require("../../models/Notes");
const deleteProfile = async (req, res) => {
    try {
        if (!req.decoded.userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await Users.findOne({
            where: {
                id: req.decoded.userId,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const notes = await Notes.findAll({
            where: {
                userId: req.decoded.userId,
            },
        });
        if (notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].type === "audio" && notes[i].Audio_Link) {
                    const audioPath = path.join(
                        __dirname,
                        "../../public/audios",
                        path.basename(notes[i].Audio_Link)
                    );

                    if (fs.existsSync(audioPath)) {
                        fs.unlinkSync(audioPath);
                    }
                }
            }
            await Notes.destroy({
                where: {
                    userId: req.decoded.userId,
                },
            });
        }
        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = deleteProfile;
