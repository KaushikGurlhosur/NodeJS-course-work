const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("This always runs.");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"/><button type="Submit">Add Product</button></form>'
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("In the second middleware");
  res.send("<h1>Hello from Express!</h1>");
});

// server.listen(3000);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
