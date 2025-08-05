// import React from "react";

// import "./Auth.css";

// const auth = (props) => (
//   <section className="auth-form">{props.children}</section>
// );

// export default auth;
import React from "react";
import "./Auth.css";

const Auth = ({ children }) => (
  <section className="auth-form">{children}</section>
);

export default Auth;
