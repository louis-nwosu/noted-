const mongoose = require("mongoose");

const Documents = mongoose.Schema(
  {
    ID: String,
    user_Docs: [{
      date: String,
      docs: []
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", Documents);
