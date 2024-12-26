const Notes = require("../../models/Notes");

const getNotes = async (req, res) => {
    try {
        const notes = await Notes.findAll({
            where: { user: req.decoded.userId },
            order: [["createdAt", "DESC"]], // Orders by createdAt in descending order
        });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = getNotes;
