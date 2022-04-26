const { User, Document } = require("../models/index");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

module.exports = {
    sign_up: async(req, res) => {
        //TODO: validate the request body
        try {
            const userExists = await User.findOne({ eMail: req.body.eMail });
            if (userExists)
                return res.status(200).json({ error: "email is already in use" });

            // const hashedPwd = await brcpyt.hash(req.body.password, 12);

            const newUser = new User({
                eMail: req.body.eMail,
                password: req.body.password,
                fullName: req.body.fullName,
            });

            const savedUser = await newUser.save();

            const newDocument = new Document({
                ID: savedUser._id,
            });

            await newDocument.save();

            const token = jwt.sign({ email: savedUser.email, id: savedUser._id },
                "wemwkknfdnfdnfddvd9039473fh", { expiresIn: "1d" }
            );

            res.status(200).json({ savedUser, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    sign_in: async(req, res) => {
        //TODO: validate the req.body

        try {
            const user = await User.findOne({ eMail: req.body.email });
            if (!user) return res.json({ error: "email or password incorrect!" });
            //
            //       const comparedPassword = await bcrypt.compare(
            //         user.password,
            //         req.body.password
            //       );
            if (user.password !== req.body.password)
                return res.json({ error: "email or password is incorrect!" });

            const token = jwt.sign({ email: user.email, id: user._id },
                "wemwkknfdnfdnfddvd9039473fh", { expiresIn: "1d" }
            );

            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};