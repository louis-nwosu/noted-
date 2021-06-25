const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("PORT", process.env.PORT || 8080);
//connect to database
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
db.once("open", () => console.log("connection to database initialzed"));

app.use('/noted', routes);

app.listen(app.get("PORT"), () =>
  console.log("app is listening on port " + app.get("PORT"))
);
