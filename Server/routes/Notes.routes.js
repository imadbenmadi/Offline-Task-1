const express = require("express");
const NotesCountroller = require("../controllers/Notes.controller");
const router = express.Router();
const Verify_Note_ownership = require("../middleware/Verify_Note_ownership.middleware");

router.get("/", NotesCountroller.getNotes);
router.get("/:id", NotesCountroller.getNote);
router.put("/:id", Verify_Note_ownership, NotesCountroller.updateNote);
router.delete("/:id", Verify_Note_ownership, NotesCountroller.deleteNote);

const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());
router.post(
    "/",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    NotesCountroller.createNote
);
module.exports = router;
