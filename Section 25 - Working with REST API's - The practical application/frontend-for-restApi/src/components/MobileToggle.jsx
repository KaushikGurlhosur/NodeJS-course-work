// import React from "react";

// import "./styles/MobileToggle.css";

// const mobileToggle = (props) => (
//   <button className="mobile-toggle" onClick={props.onOpen}>
//     <span className="mobile-toggle__bar" />
//     <span className="mobile-toggle__bar" />
//     <span className="mobile-toggle__bar" />
//   </button>
// );

// export default mobileToggle;
import React from "react";
import "./styles/MobileToggle.css";

const MobileToggle = ({ onOpen }) => (
  <button className="mobile-toggle" onClick={onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

export default MobileToggle;
