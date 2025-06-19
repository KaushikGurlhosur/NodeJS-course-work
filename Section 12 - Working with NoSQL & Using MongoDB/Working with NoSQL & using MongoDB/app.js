const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const { engine } = require("express-handlebars"); // Import express-handlebars
const errorController = require("./controllers/error");

const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user"); // Import User model

const app = express();

// Set up the view engine - for ejs - 3 lines below
app.set("view engine", "ejs"); // Set the view engine to EJS -- ejs doesn't support layouts
app.set("views", "views"); // Set the views directory

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6852b55e0675d384561127bd").then((user) => {
    req.user = new User(user.username, user.email, user.cart, user._id);
    next(); // Call next middleware
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); // 404 page

mongoConnect(() => {
  app.listen(3000);
});
