const http = require("http"); // Import the http module
// const fs = require("fs"); // Import the fs module

const routes = require("./routes"); // Import the routes module

const server = http.createServer(routes);
//   console.log(req.url, req.method, req.headers); // Log the request details
//   process.exit(); // Exit the process immediately
// const url = req.url; // Get the requested URL
// const method = req.method; // Get the request method

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
