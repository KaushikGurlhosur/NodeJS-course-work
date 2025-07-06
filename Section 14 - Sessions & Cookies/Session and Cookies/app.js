const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");

// const { engine } = require("express-handlebars"); // Import express-handlebars
const errorController = require("./controllers/error");

const User = require("./models/user"); // Import User model

const app = express();

// Set up the view engine - for ejs - 3 lines below
app.set("view engine", "ejs"); // Set the view engine to EJS -- ejs doesn't support layouts
app.set("views", "views"); // Set the views directory

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false }) // Also can configure a cookie.
);

app.use((req, res, next) => {
  User.findById("68678dedaea895862f1059eb")
    .then((user) => {
      req.user = user; // Attach the user to the request object
      next(); // Call next middleware
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404); // 404 page

// mongoConnect(() => {
//   app.listen(3000);
// });

// Now instead of the above line, we will connect to MongoDB using mongoose
mongoose
  .connect(
    "mongodb+srv://kaushikGurlhosur:depcy5-fermuw-nyGvaz@cluster0.jpqdz3m.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0" // Replace with your MongoDB connection string
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Kaushik",
          email: "kaushikrg@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save(); // Save the user to the database
      }
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
