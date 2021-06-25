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
    default: null,
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
    default: null,
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
    stamp: {
      type: [
        {
          date: String,
          docs: [Documents],
        },
      ],
      default: null,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Document", DocSchema);
