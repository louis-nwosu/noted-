const Notes = require("../models/notesModels");
const User = require("../models/userModel");

const notesControllers = {
  //controller to handle creating a note
  async createNote(req, res) {
    try {
      //get the perticular user thats posting;
      const userNote = await Notes.findOne({ ID: req.params.ID });
      if (!userNote)
        return res.status(500).send("oops, something seems to be wrong");
      //create the new note and save on DB
      userNote.notes.push({
        title: req.body.title,
        description: req.body.description,
      });
      //send the newly created note back to the user
      return res.status(200).json({ userNote });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  //controller to handle editting of a particular note
  async editNote(req, res) {
    try {
      //get the particuler user note to edit
      const notesCollection = await Notes.findOne({ ID: req.params.ID });
      //if the note doesnt exist return an error message;
      if (!notesCollection)
        return res.status(400).send("oops, an error occured!");
      //get the value to be updated
      const update = {};
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  //delete a single note
  async delNote(req, res) {
    try {
      //get the users notes
      const usersNotes = await Notes.findOne({ ID: req.params.ID });
      //handle error if note doesnt exist;
      if (!usersNotes) return res.status(401).send("something went wrong");
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  },
  //controller to get all notes
  async getNote() {},
  //controller to get a single note
  async getNotes() {
    try {
      //get the users notes
      const usersNotes = await Notes.findOne({ ID: req.params.ID });
      //handle error if note doesnt exist;
      if (!usersNotes) return res.status(401).send("something went wrong");
      return res.status(200).json({ usersNotes });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  },
};

module.exports = notesControllers;
