const express = require("express");

const path = require("path"); // importing path module

const rootDir = require("../util/path"); // importing the path module

const router = express.Router(); // importing Router from express

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); // sending the add-product.html file
  res.sendFile(path.join(rootDir, "views", "add-product.html")); // sending the add-product.html file
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router; // exporting the router
