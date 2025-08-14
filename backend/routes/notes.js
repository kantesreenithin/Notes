const express = require("express");
const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updateIsPinned,
  searchNotes
} = require("../controllers/noteController");
const router = express.Router();

const { authenticateToken } = require("../utilities");
//require for all note routes
router.use(authenticateToken);

//add note
router.post("/add-note", addNote);
//edit note
router.put("/edit-note/:noteId", editNote);
//get all notes
router.get("/get-all-notes", getAllNotes);
//delete note
router.delete("/delete-note/:noteId", deleteNote);
//update ispinned
router.put("/update-note-pinned/:noteId", updateIsPinned);
//search notes
router.get("/search-notes",searchNotes)

module.exports = router;
