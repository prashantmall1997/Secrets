//jshint esversion:8

require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Models
const usersModel = require("./schemas/userSchema");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(usersModel.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  usersModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function (accessToken, refreshToken, profile, cb) {
    usersModel.findOrCreate({
      googleId: profile.id,
      username: profile.id
    }, function (err, user) {
      return cb(err, user);
    });
  }
));

//Port
const port = process.env.PORT || 3000;

//Connect DB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Routes
module.exports = usersModel;
require('./routes')(app);

//Run Server
app.listen(port, function () {
  console.clear();
  console.log(`Server started on port ${port}`);
});