const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const dotenv = require("dotenv").config();

const noddemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const { name } = require("ejs");

const transporter = noddemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn =
  //     req.get("Cookie").split(";")[1].trim().split("=")[1] === "true";

  // console.log(req.session.isLoggedIn);

  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
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
        req.flash(
          "error",
          "This emails already exists. Please use a different email address."
        );
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
      return transporter.sendMail({
        to: email,
        from: "kaushikgurlhosur@gmail.com",
        subject: "Signup Succeeded!",
        html: "<h1>You have successfully signed up!</h1>",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user; // Attach the user to the request object
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              if (err) console.log(err);
              transporter.sendMail({
                to: email,
                from: "kaushikgurlhosur@gmail.com",
                subject: "Logged in Successfully!",
                html: "<h1>You have successfully Logged In!</h1>",
              });
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
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

exports.getReset = (req, res, next) => {
  let message = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }

    const token = buffer.toString("hex"); // to convert Hexadecimal values to ASCII values

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "kaushikgurlhosur@gmail.com",
          subject: "Password Reset",
          html: ` <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a></p>
          `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
