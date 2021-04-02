const PostRoute = require("express").Router();
const { postNoteValidation } = require("../validate");
const Notes = require("../models/notesModels");

PostRoute.get("/getnote", async (req, res) => {
  try {
    const note = await Notes.findOne({ ID: req.body.ID });
    //if no notes, send a feedback back to the user
    if (!note) res.status(400).json({ error: "could not find note" });
    //send the notes back to the user
    res.status(200).status.json({ notes });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//handle getting of all notes
PostRoute.get("/getNotes", async (req, res) => {
  try {
    const notes = await Notes.find();
    //send the notes back to the user
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//handle posting a new note
PostRoute.post("/postNote", async (req, res) => {
  try {
    //validate the request body
    const { error } = postNoteValidation(req.body);
    if (error) res.status.send(error.details[0].message);
    //create a new post objects
    const newNote = new Notes({
      note: [
        {
          title: req.body.title,
          description: req.body.description,  
        },
      ],
      
    });
  } catch (error) {
    res.status(200).json({ error });
  }
});
