// import React from "react";
// import { NavLink } from "react-router-dom";

// import "./styles/NavigationItems.css";

// const navItems = [
//   { id: "feed", text: "Feed", link: "/", auth: true },
//   { id: "login", text: "Login", link: "/", auth: false },
//   { id: "signup", text: "Signup", link: "/signup", auth: false },
// ];

// const navigationItems = (props) => [
//   ...navItems
//     .filter((item) => item.auth === props.isAuth)
//     .map((item) => (
//       <li
//         key={item.id}
//         className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
//       >
//         {/* Update the NavLink here */}
//         <NavLink to={item.link} exact="true" onClick={props.onChoose}>
//           {item.text}
//         </NavLink>
//       </li>
//     )),
//   props.isAuth && (
//     <li className="navigation-item" key="logout">
//       <button onClick={props.onLogout}>Logout</button>
//     </li>
//   ),
// ];

// export default navigationItems;
import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/NavigationItems.css";

const NAV_ITEMS = [
  { id: "feed", text: "Feed", link: "/", auth: true },
  { id: "login", text: "Login", link: "/", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
];

const NavigationItems = ({ isAuth, mobile, onLogout, onChoose }) => (
  <>
    {NAV_ITEMS.filter((item) => item.auth === isAuth).map((item) => (
      <li key={item.id} className={`navigation-item ${mobile ? "mobile" : ""}`}>
        <NavLink to={item.link} exact="true" onClick={onChoose}>
          {item.text}
        </NavLink>
      </li>
    ))}
    {isAuth && (
      <li className="navigation-item" key="logout">
        <button onClick={onLogout}>Logout</button>
      </li>
    )}
  </>
);

export default NavigationItems;
