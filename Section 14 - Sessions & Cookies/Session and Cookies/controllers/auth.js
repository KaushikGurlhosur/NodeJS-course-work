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
