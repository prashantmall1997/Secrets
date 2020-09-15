//jshint esversion:8

const passport = require("passport");

//Models
const usersModel = require("./app");

//Routes
module.exports = function (app) {

  app.route("/")
    .get((req, res) => {
      res.render("home");
    });

  app.route("/login")
    .get((req, res) => {
      res.render("login");
    })
    .post((req, res) => {
      const user = new usersModel({
        username: req.body.username,
        password: req.body.password
      });
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
          });
        }
      });
    });

  app.route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      usersModel.register({
        username: req.body.username
      }, req.body.password, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
          });
        }
      });
    });

  app.route("/secrets")
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.render("secrets");
      } else {
        res.redirect("/login");
      }
    });

  app.route("/logout")
    .get((req, res) => {
      req.logout();
      res.redirect("/");
    });
};