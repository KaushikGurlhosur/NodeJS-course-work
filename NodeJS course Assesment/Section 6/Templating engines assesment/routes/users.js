const express = require("express");

const app = express();

const router = express.Router();

const usersData = require("./home");

const users = usersData.users;

router.get("/users", (req, res, next) => {
  res.render("users", {
    title: "Users",
    users: users,
  });
});

module.exports = router;
