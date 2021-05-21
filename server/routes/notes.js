const Notes = require("express").Router();
//import the notes controllers
const {
  createNote,
  delNote,
  editNote,
  getNote,
  getNotes,
} = require("../controllers/notesController");

//route to handle creating a new note
Notes.post("/new-note/:ID", createNote);
//route to handle deleting a note
Notes.delete("/delNote", delNote);
//route to handle editing a note
Notes.patch("/edit-note", editNote);
//route to handle getting a single note
Notes.get("/get-note", getNote);
//route to handle getting all notes
Notes.get("/get-notes/:ID", getNotes);

module.exports = Notes;
