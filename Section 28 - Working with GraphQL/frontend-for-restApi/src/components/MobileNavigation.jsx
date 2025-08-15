// import React from "react";

// import NavigationItems from "./NavigationItems";
// import "./styles/MobileNavigation.css";

// const mobileNavigation = (props) => (
//   <nav className={["mobile-nav", props.open ? "open" : ""].join(" ")}>
//     <ul
//       className={["mobile-nav__items", props.mobile ? "mobile" : ""].join(" ")}
//     >
//       <NavigationItems
//         mobile
//         onChoose={props.onChooseItem}
//         isAuth={props.isAuth}
//         onLogout={props.onLogout}
//       />
//     </ul>
//   </nav>
// );

// export default mobileNavigation;
import React from "react";
import NavigationItems from "./NavigationItems";
import "./styles/MobileNavigation.css";

const MobileNavigation = ({ open, mobile, onChooseItem, isAuth, onLogout }) => (
  <nav className={`mobile-nav ${open ? "open" : ""}`}>
    <ul className={`mobile-nav__items ${mobile ? "mobile" : ""}`}>
      <NavigationItems
        mobile
        onChoose={onChooseItem}
        isAuth={isAuth}
        onLogout={onLogout}
      />
    </ul>
  </nav>
);

export default MobileNavigation;
