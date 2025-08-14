const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const cors = require("cors");

const multer = require("multer");

const feedRoutes = require("./routes/feed");

const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>Data</form>
app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image") // 'image' is the field name in the form
);

app.use("/images", express.static(path.join(__dirname, "images")));

// Enable CORS for all routes
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   next();
// });

app.use(
  cors({
    // origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // 👈 Required for Authorization headers
  })
); // Enable CORS for all routes

// /feed/posts
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("Connected to MongoDB");
    const server = app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
    const io = require("./socket").init(server, {
      cors: {
        origin: "http://localhost:5173", // or your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected.");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
