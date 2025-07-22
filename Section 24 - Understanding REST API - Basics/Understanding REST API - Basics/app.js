const express = require("express");

const feedRoutes = require("./routes/feed");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// /feed/posts
app.use("/feed", feedRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
