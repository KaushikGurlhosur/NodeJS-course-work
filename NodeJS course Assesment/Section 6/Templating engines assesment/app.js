const express = require("express");

const app = express();

const home = require("./routes/home");
const users = require("./routes/users");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(home.router);
app.use(users);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
