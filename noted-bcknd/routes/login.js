const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");

const login = express.Router();

login.get("/users", async (req, res) => {
  const users = await Users.find();
  res.json(users);
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
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new Users({
    name: req.body.name,
    bio: req.body.bio,
    password: hashedPassword,
  });
  await user
    .save()
    .then(() => res.status(200).json({ saved: "user saved!" }))
    .catch((err) => res.status(400).json(err));
});

login.post("/login", async (req, res) => {
  try {
    const thisUser = await Users.findOne({ name: req.body.name });
    const correctPassword = await bcrypt.compare(req.body.password, thisUser.password);
    if (correctPassword) {
      res.status(200).json(thisUser);
    }
    res.status(401).json({ err: "user not found!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

login.delete("/:postID", async (req, res) => {
  try {
    const deletedPost = await Users.remove({ _id: req.params.postID });
    res.json(deletedPost);
  } catch (err) {
    res.status(400).json({ mes: "couldnt delete" });
  }
});

module.exports = login;
