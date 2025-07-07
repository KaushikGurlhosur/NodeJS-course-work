const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn =
  //     req.get("Cookie").split(";")[1].trim().split("=")[1] === "true";

  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }

      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  User.findById("68678dedaea895862f1059eb")
    .then((user) => {
      req.session.user = user; // Attach the user to the request object
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        if (err) console.log(err);
        res.redirect("/");
      });
      console.log(req.session);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });

  //   res.setHeader("Set-Cookie", "loggedIn=true");
  //   res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10"); // Adding multiple
  //   res.setHeader("Set-Cookie", "loggedIn=true; Secure"); // For https
  //   res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly"); // for http
  //   res.setHeader("Set-Cookie", "loggedIn=true; Domain=..."); // Where he cookie needs to be sent - for tracking purposes
  //   res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
