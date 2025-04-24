const express = require("express");

const app = express();
const path = require("path");

const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users");

app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter);
app.use(usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
