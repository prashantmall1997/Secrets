//jshint esversion:8

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      const password = req.body.password;
      usersModel.findOne({
        email: username
      }, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, result) => {
              if (result === true) {
                res.render("secrets");
              }
            });
          }
        }
      });
    });

  app.route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        const newUser = usersModel({
          email: req.body.username,
          password: hash
        });

        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.render("secrets");
          }
        });
      });
    });

};
