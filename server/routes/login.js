const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const Notes = require("../models/notesModels");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validate");

const login = express.Router();

login.get("/users", async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

login.get("/users/:id", async (req, res) => {
  try {
    const thisUser = await Users.findById(req.params.id);
    res.status(200).json(thisUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

login.post("/post", async (req, res) => {
  //validate the payload
  try {
    const { error } = registerValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);
    //check if user already exists
    const userExists = await Users.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).json({ error: "user already exists..." });
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //create a new user
    const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    //save the new user to the database
    const savedUser = await user.save();
    //create a notes schema for the user with ID
    const notes = new Notes({
      ID: savedUser._id,
    });
    //save the new note
    const newNote = await notes.save();
    //assign jwt token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      "puhw0fhw0uyg0W7547Q03YTQ0TQ73GQ7RQ0T3GWGDF0jsdfoh8",
      { expiresIn: "1h" }
    );
    //send back a response
    return res.status(200).json({ token, savedUser });
    //if error, catch it and notify the user
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

login.post("/login", async (req, res) => {
  try {
    //validate the request body
    const { error } = loginValidation(req.body);
    if (error) req.status(400).send(error.details[0].message);
    ///check if the user exists
    const thisUser = await Users.findOne({ email: req.body.email });
    if (!thisUser) return req.status(400).json({ error: "user not found" });
    //check if password provided is corect
    const correctPassword = await bcrypt.compare(
      req.body.password,
      thisUser.password
    );
    if (!correctPassword) {
      return res
        .status(400)
        .json({ err: "username or password is incorrect!" });
    }
    //assign jwt token
    const token = jwt.sign(
      { email: thisUser.email, id: thisUser._id },
      "puhw0fhw0uyg0W7547Q03YTQ0TQ73GQ7RQ0T3GWGDF0jsdfoh8",
      { expiresIn: "1h" }
    );
    //send back user if password is correct
    return res.status(200).json({thisUser, token});
    //if error, han dle and send back a response
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

module.exports = login;
