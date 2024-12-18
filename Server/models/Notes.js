const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const Users = require("./Users");

const Notes = sequelize.define("Notes", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Ensure the model name matches the table name
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
});

Notes.belongsTo(Users, { foreignKey: "UserId", onDelete: "CASCADE" });
Users.hasMany(Notes, { foreignKey: "UserId" });

module.exports = Notes;
