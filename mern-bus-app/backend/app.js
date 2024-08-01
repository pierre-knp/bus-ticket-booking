require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const cors = require('cors');

var app = express();

// Log MongoURI for debugging
console.log("MongoURI:", process.env.MongoURI);

// Import routes
require('./auth/auth');
const login = require('./routes/login');
const loggedInPage = require('./routes/loggedInUser');
const bookingRoute = require('./routes/routeSelection');
var registerRouter = require('./routes/register');

// DB Config
const DB_URL = process.env.MongoURI;

// Connect to MongoDB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', login);
app.use('/booking', bookingRoute);
app.use('/register', registerRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), loggedInPage);

module.exports = app;
