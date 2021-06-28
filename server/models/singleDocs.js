const mongoose = require("mongoose");

const DOCBODY = mongoose.Schema(
  { config: String, moreConfig: String },
  { timestamps: true }
);

const singleNotesSchema = mongoose.Schema(
  {
    doc_type: String,
    doc_title: String,
    doc_body: DOCBODY,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Single_document", singleNotesSchema);
