const express = require("express");

const path = require("path"); // importing path module

const rootDir = require("../util/path"); // importing the path module

const router = express.Router(); // importing Router from express

router.get("/", (req, res, next) => {
  //   res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // sending the shop.html file

  res.sendFile(path.join(rootDir, "views", "shop.html")); // sending the shop.html file
});

module.exports = router; // exporting the router
