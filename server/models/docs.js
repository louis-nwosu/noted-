const mongoose = require("mongoose");

const Documents = mongoose.Schema({
  type: String,
  created_at: {
    type: Date,
    default: Date,
  },
  singleDoc: {
    title: String,
    body: String,
    isFavorite: Boolean,
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
  },
});

const DocSchema = mongoose.Schema(
  {
    stamp: {
      type: [
        {
          date: Date,
          docs: [Documents],
        },
      ],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Document", DocSchema);
