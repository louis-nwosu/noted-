const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
//import env config file and configure it;
const dotenv = require("dotenv");
dotenv.config();

const loginRoutes = require("./routes/login");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//connect to database';
mongoose.connect(
  "mongodb+srv://louis_0:grjujcp1g4jcu7oe@cluster0.isjfs.mongodb.net/noted?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("connection to database initalized"));

app.use(express.json());
app.use("/", loginRoutes);

app.listen(8080, () => {
  console.log("app is running on port ", 8080);
});
