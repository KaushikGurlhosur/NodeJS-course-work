const express = require("express");

// const app = express();

const router = express.Router();

const path = require("path");

const rootDir = require("../utils/path");

router.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "users.html"));
});

module.exports = router;
