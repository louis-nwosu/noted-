//import dependencies
const { registerValidation, loginValidation } = require("../helpers/validate");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const Notes = require("../models/notesModels");
const jwt = require("jsonwebtoken");

const UserController = {
  async signUp(req, res) {
    //validate the payload
    try {
      const { error } = registerValidation(req.body);
      if (error) res.status(400).send(error.details[0].message);
      //check if user already exists
      const userExists = await Users.findOne({
        email: req.body.email,
      });
      if (userExists)
        return res.status(400).json({
          error: "user already exists...",
        });
      //hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //create a new user
      const user = new Users({
        userName: req.body.userName,
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
        {
          email: user.email,
          id: user._id,
        },
        "puhw0fhw0uyg0W7547Q03YTQ0TQ73GQ7RQ0T3GWGDF0jsdfoh8",
        {
          expiresIn: "1h",
        }
      );
      //send back a response
      return res.status(200).json({
        token,
        savedUser,
      });
      //if error, catch it and notify the user
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
  async signIn(req, res) {
    try {
      //validate the request body
      const { error } = loginValidation(req.body);
      if (error) res.status(400).send(error.details[0].message);
      ///check if the user exists
      const thisUser = await Users.findOne({ email: req.body.email });
      if (!thisUser) return res.status(400).json({ error: "user not found" });
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
      return res.status(200).json({ thisUser, token });
      //if error, han dle and send back a response
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },
};

module.exports = UserController;
