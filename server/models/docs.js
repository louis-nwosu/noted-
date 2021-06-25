const mongoose = require("mongoose");

const Documents = mongoose.Schema({
  type: String,
  require: true,
  created_at: Date.now,
  singleDoc: {
    title: String,
    body: String,
    isFavourite: Boolean,
    require: false,
  },
  collectionNote: {
    collectionTitle: String,
    isFavourite: Boolean,
    docArr: [
      {
        title: String,
        body: String,
        created_at: String,
      },
    ],
    required: false,
  },
});

const DocSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    created_at: Date.now,
    stamp: [
      {
        date: String,
        docs: [Documents],
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Document", DocSchema);
