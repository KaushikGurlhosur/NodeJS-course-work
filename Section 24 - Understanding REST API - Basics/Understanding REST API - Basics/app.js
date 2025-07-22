const express = require("express");

const cors = require("cors");

const feedRoutes = require("./routes/feed");

const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>Data</form>
app.use(bodyParser.json()); // application/json

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// app.use(cors()); // Enable CORS for all routes

// /feed/posts
app.use("/feed", feedRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
