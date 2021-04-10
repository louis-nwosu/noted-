const PostRoute = require("express").Router();
const { postNoteValidation } = require("../validate");
const Notes = require("../models/notesModels");
const User = require("../models/userModel");

//get a specific note
PostRoute.get("/getnote/:user/:ID", async (req, res) => {
  try {
    const notes = await Notes.findOne({ ID: req.body.ID });
    //if no notes, send a feedback back to the user
    if (!note) res.status(400).json({ error: "could not find note" });
    //send the notes back to the user
    const [note] = notes.notes.filter((id) => notes._id == req.params.ID);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//handle getting of all notes
PostRoute.get("/getNotes/:userID", async (req, res) => {
  try {
    const notes = await Notes.findOne({ ID: req.params.userID });
    if (!notes) return res.status(400).send("notes cannot be found!");
    //return the notes back to the user
    return res.status(200).json({ notes });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//handle posting a new note
PostRoute.post("/postNote/:userID", async (req, res) => {
  try {
    //validate the request body
    // const { error } = postNoteValidation(req.body);
    // if (error) return res.status.send(error.details[0].message);
    //get the user thats posting
    let userNote = await Notes.findOne({ ID: req.params.userID });
    if (!userNote) return res.status(400).send("cannot perform this action");
    //add the new post to that users note
    userNote.notes.push({
      title: req.body.title,
      description: req.body.description,
    });
    userNote = await userNote.save();
    //return the notes back to the user
    return res.status(200).json(userNote);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

//handle deleting a note
PostRoute.delete("/deletePost", async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = PostRoute;
