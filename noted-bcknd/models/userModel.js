const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("myusers", userSchema);
