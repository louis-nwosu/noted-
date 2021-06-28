const Document = require("../models/docs");
const Collection = require("../models/docCollection");
const singleDocs = require("../models/singleDocs");

module.exports = {
  //controller to handle get all documents of a user
  getAllDocs: async (req, res) => {
    try {
      const docs = await Document.findOne({ ID: req.params.ID });
      if (!docs) {
        return res.status(400).json({ message: "oops something went wrong!" });
      }
      return res.status(200).json(docs);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //controller to handle adding a doc to a user docs array
  addDoc: async (req, res) => {
    try {
      const userDoc = await Document.findOne({ ID: req.params.ID });
      if (!userDoc) {
        return res.status(401).json({ message: "oops something went wrong" });
      }
      let newDoc;
      if (req.body.doc_type == "single") {
        newDoc = new singleDocs({
          doc_type: "single",
          doc_title: "testing 1 2",
          doc_body: {
            config: "omoo",
            moreConfig: "omoo indddeeed",
          },
        });
      } else if (req.body.doc_type == "collection") {
        newDoc = new Collection({
          doc_type: "collection",
          doc_collection_name: "testing 2 3",
          docColl: [],
        });
      }
      if (userDoc.user_Docs.length == 0) {
        userDoc.user_Docs.push({
          date: req.body.date,
          docs: [newDoc],
        });
      } else {
        if (
          req.body.date === userDoc.user_Docs[userDoc.user_Docs.length - 1].date
        ) {
          userDoc.user_Docs[userDoc.user_Docs.length - 1].docs.push(newDoc);
        } else {
          userDoc.user_Docs.push({
            date: req.body.date,
            docs: [newDoc],
          });
        }
      }
      await userDoc.save();
      return res.status(200).json(userDoc);
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  },
};
