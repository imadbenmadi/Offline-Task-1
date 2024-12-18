const express = require("express");
const NotesCountroller = require("../controllers/Notes.controller");
const router = express.Router();
const Verify_Note_ownership = require("../middleware/Verify_Note_ownership.middleware");

router.get("/", NotesCountroller.getNotes);
router.get("/:id", NotesCountroller.getNote);
router.put("/:id", Verify_Note_ownership, NotesCountroller.updateNote);
router.delete("/:id", Verify_Note_ownership, NotesCountroller.deleteNote);
router.post("/", NotesCountroller.createNote);
module.exports = router;
