// import React from "react";
// import { NavLink } from "react-router-dom";

// import MobileToggle from "./MobileToggle";
// import Logo from "./Logo";
// import NavigationItems from "./NavigationItems";

// import "./styles/MainNavigation.css";

// const mainNavigation = (props) => (
//   <nav className="main-nav">
//     <MobileToggle onOpen={props.onOpenMobileNav} />
//     <div className="main-nav__logo">
//       <NavLink to="/">
//         <Logo />
//       </NavLink>
//     </div>
//     <div className="spacer" />
//     <ul className="main-nav__items">
//       <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
//     </ul>
//   </nav>
// );

// export default mainNavigation;
import React from "react";
import { NavLink } from "react-router-dom";
import MobileToggle from "./MobileToggle";
import Logo from "./Logo";
import NavigationItems from "./NavigationItems";
import "./styles/MainNavigation.css";

const MainNavigation = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <nav className="main-nav">
    <MobileToggle onOpen={onOpenMobileNav} />
    <div className="main-nav__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems isAuth={isAuth} onLogout={onLogout} />
    </ul>
  </nav>
);

export default MainNavigation;
