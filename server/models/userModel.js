const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
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

module.exports = mongoose.model("user", userSchema);
