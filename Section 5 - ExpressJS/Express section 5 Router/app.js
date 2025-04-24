const express = require("express");

const path = require("path"); // importing path module

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); // this will serve the static files from the public folder

app.use("/admin", adminRoutes); // using the router // this will add /admin to all routes in admin.js its a Filtering paths

app.use(shopRoutes); // using the router

app.use((req, res, next) => {
  // res.status(404).send("<h1>Page not found</h1>");
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// server.listen(3000);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
