const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Notes = require("./Notes");

const Courses = sequelize.define("Courses", {
    Audio_Link: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    NoteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Notes, // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Courses.belongsTo(Notes, { foreignKey: "NoteId", onDelete: "CASCADE" });
Notes.hasMany(Courses, { foreignKey: "NoteId" });

module.exports = Courses;
