const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("Middleware 1: Request received");
//   next();
// });

// app.use("/", (req, res, next) => {
//   console.log("Middleware 2: Processing request");
//   res.send("<h1>Respond from Middleware 2</h1>");
// });

app.use("/users", (req, res, next) => {
  console.log("Middleware 2: Handling users - /users request");
  res.send("<h1>I am handling all routes to /users</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Middleware 1: Handling root - / request");
  res.send("<h1>Response from Middleware 1</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
