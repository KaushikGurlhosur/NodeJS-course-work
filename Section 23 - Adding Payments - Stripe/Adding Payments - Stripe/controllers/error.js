exports.get404 = (req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "",
  }); // Render the 404
};
exports.get505 = (req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));

  res.status(500).render("500", {
    pageTitle: "Something went wrong!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  }); // Render the 500
};
