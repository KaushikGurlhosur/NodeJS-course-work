const express = require("express");

const router = express.Router();
const path = require("path");

const users = [];

router.get("/", (req, res, next) => {
  res.render("home", {
    title: "Home",
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  users.push({ name: req.body.name });
  res.redirect("/users");
});

module.exports = {
  router,
  users,
};
