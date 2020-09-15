//jshint esversion:8

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const session = require('express-session');
const passport = require('passport');

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

passport.serializeUser(usersModel.serializeUser());
passport.deserializeUser(usersModel.deserializeUser());

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