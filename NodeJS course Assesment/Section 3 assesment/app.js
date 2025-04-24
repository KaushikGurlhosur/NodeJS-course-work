const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Assesment</title></head>");
    res.write(
      "<body><form method='POST' action='/create-user'><h1>Hi, and welcome to my First Assesment</h1><label for='fullmane'>Full Name :</label><input id='fullname' type='text' placeholder='Enter your name' name='message' /><button type='Submit'>Send</button></form></body>"
    );
    res.write("<html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Assesment</title></head>");
    res.write(
      "<body><h1>List of Users</h1><ul><li>Kaushik</li><li>Yuvraj</li><li>Gurlhosur</li></ul></body>"
    );
    res.write("<html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);

      fs.writeFile("username.txt", message.split("+").join(" "), (err) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/html");
          res.write("<html>");
          res.write("<head><title>Error</title></head>");
          res.write("<body><h1>Internal Server Error</h1></body>");
          res.write("</html>");

          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
