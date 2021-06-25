const { User, Document } = require("../models/index");
const jwt = require("jsonwebtoken");

export default userController = {
  //sign-in controller
  sign_in: async (req, res) => {
    //TODO: validate the request body
    try {
      //check if user already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists)
        return res.status(400).json({ message: "email is already in use" });

      //TODO: hash the password
      // const hashedPwd = await brcpt.hash(req.body.password, 12);

      //create a new user
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });

      //save the user
      const savedUser = await newUser.save();

      //create a new document and assign to user
      const newDocument = new Document({
        ID: savedUser._id,
      });

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
};
