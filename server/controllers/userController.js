const { User, Document } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  //sign-in controller
  sign_up: async (req, res) => {
    //TODO: validate the request body
    try {
      //check if user already exists
      const userExists = await User.findOne({ eMail: req.body.eMail });
      if (userExists)
        return res.status(400).json({ message: "email is already in use" });

      const hashedPwd = await brcpyt.hash(req.body.password, 12);

      //create a new user
      const newUser = new User({
        eMail: req.body.eMail,
        password: hashedPwd,
        fullName: req.body.fullName,
      });

      //save the user
      const savedUser = await newUser.save();

      //create a new document and assign to user
      const newDocument = new Document({
        ID: savedUser._id,
      });

      await newDocument.save();

      //assign a token to the user
      const token = jwt.sign(
        { email: savedUser.email, id: savedUser._id },
        "wemwkknfdnfdnfddvd9039473fh",
        { expiresIn: "1d" }
      );

      //send the new user back with the token
      res.status(200).json({ savedUser, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //controller to handle user sign in
  sign_in: async (req, res) => {
    //TODO: validate the req.body

    try {
      //find the user in database
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.json({ error: "email or password incorrect!" });

      const comparedPassword = await bcrypt.compare(
        user.password,
        req.body.password
      );
      if (!comparedPassword)
        return res.json({ error: "email or password is incorrect!" });
      console.log(comparedPassword);

      //create a token to send along
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "wemwkknfdnfdnfddvd9039473fh",
        { expiresIn: "1d" }
      );

      //send back the user and the token
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
