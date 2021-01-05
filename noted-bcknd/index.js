const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv/config');

const loginRoutes = require('./routes/login');
const cookieParser = require('cookie-parser');

const app = express();

//connect to database';
mongoose.connect(
   'mongodb+srv://benjamin:n24fVUvuyfD7WbrR@cluster0.1gzwg.mongodb.net/bitstacked?authSource=admin&replicaSet=atlas-7yq1n7-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
   {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
   },
   () => console.log('connected to databse')
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('connection to database initalized'));

app.use(cookieParser());
app.use(session({
    secret: 'wnfwljfqwpefjwec565655665654545hirefgfgfhprhtprughew[fhq[tgqhq[phqp31455',
    resave: true,
    saveUninitialized:  true
}));
app.use(express.json());
app.use('/', loginRoutes);

app.listen(3000, () => {
    console.log('app is running on port ', 3000);
})
