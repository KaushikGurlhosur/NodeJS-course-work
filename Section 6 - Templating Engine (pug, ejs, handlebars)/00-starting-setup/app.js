const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { engine } = require("express-handlebars"); // Import express-handlebars

const app = express();

// Set up the view engine - for handlebars - 3 lines below
app.engine(
  "handlebars",
  engine({ layoutsDir: "views/layouts", defaultLayout: "main-layout" })
); // Set the view engine to Handlebars
app.set("view engine", "handlebars"); // Set the view engine to Handlebars
app.set("views", "views"); // Set the views directory

// Set up the view engine - for pug - 2 lines below
// app.set("view engine", "pug"); // Set the view engine to Pug - Template engine
// app.set("views", "views"); // Set the views directory

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  res.status(404).render("404", { pageTitle: "Page Not Found" }); // Render the 404 page using Pug
});

app.listen(3000);
