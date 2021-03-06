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
      usersModel.find({
        "secret": {
          $ne: null
        }
      }, (err, foundUsers) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUsers) {
            res.render("secrets", {
              userWithSecrets: foundUsers
            });
          }
        }
      });
    });

  app.route("/logout")
    .get((req, res) => {
      req.logout();
      res.redirect("/");
    });

  // app.route("/auth/google")
  //   .get((req, res) => {
  //     passport.authenticate("google", {
  //       scope: ['profile']
  //     });
  //   });

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    }));

  app.get('/auth/google/secrets',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/secrets');
    });

  app.route("/submit")
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.render("submit");
      } else {
        res.redirect("/login");
      }
    })

    .post((req, res) => {
      const submittedSecret = req.body.secret;

      usersModel.findById(req.user.id, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            foundUser.secret = submittedSecret;
            foundUser.save(() => {
              res.redirect("/secrets");
            });
          }
        }
      });
    });
};