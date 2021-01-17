const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyparser = require('body-parser');
require('dotenv/config');

const loginRoutes = require('./routes/login');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(session({
    secret: 'bfglbdfpqwhpdhbfwdfhwouhwpeje[jhdhflfhowf',
    saveUninitialized: true,
    resave: true
}))

//connect to database';
mongoose.connect(
   'mongodb+srv://louis_0:grjujcp1g4jcu7oe@cluster0.isjfs.mongodb.net/noted?retryWrites=true&w=majority',
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

app.listen(8080, () => {
    console.log('app is running on port ', 8080);
})
