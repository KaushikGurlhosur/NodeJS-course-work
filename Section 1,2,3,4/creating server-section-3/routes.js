const fs = require("fs"); // Import the fs module

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>"); // Start the HTML response
    res.write("<head><title>Enter Message</title></head>"); // Add a title to the HTML

    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username" placeholder="username"><button type="Submit">Send</button> </form></body>'
    ); // Add a body to the HTML
    res.write("</html>"); // End the HTML response
    return res.end(); // End the response
  }

  if (url === "/message" && method === "POST") {
    const body = []; // Initialize an empty array to store the request body
    req.on("data", (chunk) => {
      body.push(chunk); // Push each chunk of data into the array
      console.log(body); // Log the chunk of data
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];

      fs.writeFile("message.txt", message.split("+").join(" "), (err) => {
        if (err) {
          console.log(err); // Log any error that occurs while writing the file
        }
      });
    });

    // res.writeHead(302, { 'Location', '/' }); // Redirect to the root URL  **Can also be written as: res.statusCode = 302; res.setHeader('Location', '/');**
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end(); // End the response
  }

  res.setHeader("Content-Type", "text/html"); // Set the response header
  res.write("<html>"); // Start the HTML response
  res.write("<head><title>My First Page</title></head>"); // Add a title to the HTML
  res.write("<body><h1>Hello from Node.js Server!</h1></body>"); // Add a body to the HTML
  res.write("</html>"); // End the HTML response
  res.end(); // End the response
};

module.exports = requestHandler; // Export the requestHandler function

// DIfferent ways to export the requestHandler function and some hard coded text

// module.exports = {
//   handler: requestHandler, // Export the requestHandler function
//   someText: "Some hard coded text", // Export a hard coded text
// };

// module.exports.handler = requestHandler; // Export the requestHandler function
// module.exports.someText = "Some hard coded text"; // Export a hard coded text

// exports.handler = requestHandler; // Export the requestHandler function
// exports.someText = "Some hard coded text"; // Export a hard coded text
