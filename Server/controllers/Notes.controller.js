const getNotes = require("./Notes/getNotes");
const getNote = require("./Notes/getNote");
const updateNote = require("./Notes/updateNote");
const deleteNote = require("./Notes/deleteNote");
const createNote = require("./Notes/createNote");
const NotesController = {
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    createNote,
};
module.exports = NotesController;
