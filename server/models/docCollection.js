const mongoose = require("mongoose");

const DOCBODY = mongoose.Schema(
  { config: String, moreConfig: String },
  { timestamps: true }
);

const DocumentCollection = mongoose.Schema(
  {
    createdAt: Date.now,
    docTitle: String,
    docBody: {
      type: DOCBODY,
    },
  },
  { timestamps: true }
);

const docCollection = mongoose.Schema(
  {
    ID: String,
    createdAt: Date.now,
    doc_type: String,
    docColl: [DocumentCollection],
  },
  { timestamps: true }
);

module.exports = mongoose.model("docCollection", docCollection);
