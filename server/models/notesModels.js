const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const noteschema = mongoose.Schema({
  notes: [
    {
      title: String,
      description: String,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  ID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notes", noteschema);
