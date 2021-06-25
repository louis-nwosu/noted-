const mongoose = require("mongoose");

const Documents = mongoose.Schema(
  {
    ID: String,
    user_Docs: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", Documents);
