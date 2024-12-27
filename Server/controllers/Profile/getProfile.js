const Users = require("../../models/Users");
const getProfile = async (req, res) => {
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
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = getProfile;
