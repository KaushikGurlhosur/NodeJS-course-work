const path = require("path");
const dotenv = require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");

const cookieParser = require("cookie-parser");

const flash = require("connect-flash");

const multer = require("multer");

// const csrf = require("csurf"); // Deprecated

// middleware
const { doubleCsrf } = require("csrf-csrf");

const MongoDBStore = require("connect-mongodb-session")(session);

// const { engine } = require("express-handlebars"); // Import express-handlebars
const errorController = require("./controllers/error");

const User = require("./models/user"); // Import User model

const MONGODB_URI = process.env.MONGODB_URI_API;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// const csrfProtection = csrf();

const { doubleCsrfProtection } = doubleCsrf({
  // Function that optionally takes the request and returns a secret.
  getSecret: () => "seceret to generate hash value of the token",
  getSessionIdentifier: (req) => req.sessionID,
  // A function that returns the token from the request
  getCsrfTokenFromRequest: (req) => {
    return req.body._csrf;
  },
  cookieName: "__Kaushik-psifi.x-csrf-token",
  cookieOptions: {
    secure: false,
  },
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Set up the view engine - for ejs - 3 lines below
app.set("view engine", "ejs"); // Set the view engine to EJS -- ejs doesn't support layouts
app.set("views", "views"); // Set the views directory

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false })); // Parses only the text from the form

app.use(
  multer({
    // dest: "images",
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
); // Now this destination creates a images folder in the project

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cookieParser("secret for cookie signing"));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }) // Also can configure a cookie.
);

// app.use(csrfProtection);
app.use(doubleCsrfProtection);

app.use(flash()); // Should be initialized only after the session.

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next(); // If user was not found in the database
      }
      req.user = user; // Attach the user to the request object
      next(); // Call next middleware
    })
    .catch((err) => {
      // console.log(err);
      throw new Error(err);
    });
});

// This will be added to all the renders
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get505);

app.use(errorController.get404); // 404 page

// CENTRAL ERROR HANDLER FOR 500
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(....)
  res.redirect("/500");
}); // Express understand that its special kinda middleware

// mongoConnect(() => {
//   app.listen(3000);
// });

// Now instead of the above line, we will connect to MongoDB using mongoose
mongoose
  .connect(
    MONGODB_URI // Replace with your MongoDB connection string
  )
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
