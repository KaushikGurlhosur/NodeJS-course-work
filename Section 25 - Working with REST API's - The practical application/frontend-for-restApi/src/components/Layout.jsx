// import React, { Fragment } from "react";

// import "./styles/Layout.css";

// const layout = (props) => (
//   <Fragment>
//     <header className="main-header">{props.header}</header>
//     {props.mobileNav}
//     <main className="content">{props.children}</main>
//   </Fragment>
// );

// export default layout;

import React from "react";
import "./styles/Layout.css";

const Layout = ({ header, mobileNav, children }) => (
  <>
    <header className="main-header">{header}</header>
    {mobileNav}
    <main className="content">{children}</main>
  </>
);

export default Layout;
