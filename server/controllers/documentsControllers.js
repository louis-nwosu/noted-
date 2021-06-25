const { Document } = require("../models");

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
  addDoc: async (req, res)  => {
    try {
      const userDoc = await Document.findOne({ID: req.params.ID});
      if(!userDoc) {
        return res.status(401).json({ message: 'oops something went wrong'});
      }
      const newDoc = {
        docs: {
          type: 'single',
          singleDoc: {
            title: 'nonso',
            body: 'testing',
            isFavorite: false,
          }
        }
      }
      userDoc.stamp.push(newDoc);
      await userDoc.save();
      return res.status(200).json(userDoc);
    } catch (error) {
      return res.status(200).json({message: error.message});
    }
  }
};
