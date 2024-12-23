const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Users = require("./Users");

const Notes = sequelize.define("Notes", {
    Title: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true, // Conditional validation will handle this
        validate: {
            customValidation(value) {
                if (this.type === "text" && (!value || value.trim() === "")) {
                    throw new Error(
                        "Description is required when type is 'text'."
                    );
                }
            },
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    Audio_Link: {
        type: DataTypes.STRING,
        allowNull: true, // Conditional validation will handle this
        validate: {
            customValidation(value) {
                if (this.type === "audio" && (!value || value.trim() === "")) {
                    throw new Error(
                        "Audio_Link is required when type is 'audio'."
                    );
                }
            },
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [["text", "audio"]],
                msg: "Type must be either 'text' or 'audio'.",
            },
        },
    },
});

// Associations
Notes.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });
Users.hasMany(Notes, { foreignKey: "userId" });

module.exports = Notes;
