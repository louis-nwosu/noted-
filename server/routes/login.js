const express = require("express");
//import the controllers
const { signIn, signUp } = require("../controllers/usercontroller");

//create the router object;
const Log = express.Router();

//route to handle logging into existing account
Log.post("/signin", signIn);
//route to handle creating a new user account
Log.post("/signup", signUp);

module.exports = login;
