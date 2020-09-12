//jshint esversion:8

const md5 = require('md5');

//Models
const usersModel = require("./schemas/userSchema");

//Routes
module.exports = function(app) {

  app.route("/")
    .get((req, res) => {
      res.render("home");
    });

  app.route("/login")
    .get((req, res) => {
      res.render("login");
    })
    .post((req, res) => {
      const username = req.body.username;
      const password = md5(req.body.password);
      usersModel.findOne({
        email: username
      }, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            if (foundUser.password === password) {
              res.render("secrets");
            }
          }
        }
      });
    });

  app.route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      const newUser = usersModel({
        email: req.body.username,
        password: md5(req.body.password)
      });

      newUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("secrets");
        }
      });
    });

};
