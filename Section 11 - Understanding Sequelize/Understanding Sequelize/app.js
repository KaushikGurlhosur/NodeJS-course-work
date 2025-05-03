const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const { engine } = require("express-handlebars"); // Import express-handlebars
const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

// Set up the view engine - for ejs - 3 lines below
app.set("view engine", "ejs"); // Set the view engine to EJS -- ejs doesn't support layouts
app.set("views", "views"); // Set the views directory

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); // 404 page

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // A product belongs to a user and One user can have many products
User.hasMany(Product); // A user can have many products

sequelize
  .sync({ force: true }) // force: true will drop the table if it already exists
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
