// /* eslint-disable react/prop-types */
// import React from "react";
// import { Link } from "react-router-dom";

// import "./styles/Button.css";

// const Button = (props) => {
//   const buttonClasses = `button button--${props.design} button--${props.mode}`;

//   return !props.link ? (
//     <button
//       className={buttonClasses}
//       onClick={props.onClick}
//       disabled={props.disabled || props.loading}
//       type={props.type}
//     >
//       {props.loading ? "Loading..." : props.children}
//     </button>
//   ) : (
//     <Link className={buttonClasses} to={props.link}>
//       {props.children}
//     </Link>
//   );
// };

// export default Button;

import React from "react";
import { Link } from "react-router-dom";
import "./styles/Button.css";

const Button = ({
  design,
  mode,
  onClick,
  disabled,
  loading,
  children,
  link,
  type,
}) => {
  const buttonClasses = `button button--${design} button--${mode}`;

  return link ? (
    <Link className={buttonClasses} to={link}>
      {children}
    </Link>
  ) : (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
