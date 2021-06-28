const mongoose = require("mongoose");

const DOCBODY = mongoose.Schema(
  { config: String, moreConfig: String },
  { timestamps: true }
);

const DocumentCollection = mongoose.Schema(
  {
    docTitle: String,
    docBody: {
      type: DOCBODY,
    },
  },
  { timestamps: true }
);

const docCollection = mongoose.Schema(
  {
    createdAt: Date,
    doc_type: String,
    doc_collection_name: String,
    docColl: [DocumentCollection],
  },
  { timestamps: true }
);

module.exports = mongoose.model("docCollection", docCollection);
