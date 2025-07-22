const express = require("express");

const feedRoutes = require("./routes/feed");

const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>Data</form>
app.use(bodyParser.json()); // application/json

// /feed/posts
app.use("/feed", feedRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
