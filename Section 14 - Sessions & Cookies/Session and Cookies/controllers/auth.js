exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    req.get("Cookie").split(";")[1].trim().split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  //   res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10"); // Adding multiple
  //   res.setHeader("Set-Cookie", "loggedIn=true; Secure"); // For https
  //   res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly"); // for http
  //   res.setHeader("Set-Cookie", "loggedIn=true; Domain=..."); // Where he cookie needs to be sent - for tracking purposes
  res.redirect("/");
};
