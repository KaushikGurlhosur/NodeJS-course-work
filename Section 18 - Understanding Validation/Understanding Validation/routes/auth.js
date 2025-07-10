const express = require("express");

const User = require("../models/user");

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.get("/reset", authController.getReset);

router.get("/reset/:token", authController.getNewPassword);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email address."),
    body("password", "Please enter a password at least 6 characters").isLength({
      min: 6,
    }),
  ],
  authController.postLogin
);

// VALIDATIONS LIST
// check()
// body()
// cookie()
// header()
// param()
// query()

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden");
        // }
        // return true;

        return User.findOne({ email: value }).then((userDoc) => {
          //   if (userDoc) {
          //     req.flash(
          //       "error",
          //       "This emails already exists. Please use a different email address."
          //     );
          //     return res.redirect("/signup");
          //   }

          if (userDoc) {
            return Promise.reject(
              "This emails already exists. Please use a different email address."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 6 characters."
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.post("/reset", authController.postReset);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
