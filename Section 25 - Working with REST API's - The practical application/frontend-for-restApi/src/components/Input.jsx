// // import React from "react";

// // import "./styles/Input.css";

// // const input = (props) => (
// //   <div className="input">
// //     {props.label && <label htmlFor={props.id}>{props.label}</label>}
// //     {props.control === "input" && (
// //       <input
// //         className={[
// //           !props.valid ? "invalid" : "valid",
// //           props.touched ? "touched" : "untouched",
// //         ].join(" ")}
// //         type={props.type}
// //         id={props.id}
// //         value={props.value || ""}
// //         onChange={(e) => props.onChange(e.target.value)}
// //         onBlur={props.onBlur}
// //         placeholder={props.placeholder}
// //       />
// //     )}
// //     {props.control === "textarea" && (
// //       <textarea
// //         className={[
// //           !props.valid ? "invalid" : "valid",
// //           props.touched ? "touched" : "untouched",
// //         ].join(" ")}
// //         id={props.id}
// //         rows={props.rows}
// //         required={props.required}
// //         value={props.value}
// //         onChange={(e) => props.onChange(props.id, e.target.value)}
// //         onBlur={props.onBlur}
// //       />
// //     )}
// //   </div>
// // );

// // export default input;

// import React from "react";
// import "./styles/Input.css";

// const Input = (props) => (
//   <div className="input">
//     {props.label && <label htmlFor={props.id}>{props.label}</label>}
//     {props.control === "input" && (
//       <input
//         className={[
//           !props.valid ? "invalid" : "valid",
//           props.touched ? "touched" : "untouched",
//         ].join(" ")}
//         type={props.type}
//         id={props.id}
//         value={props.value || ""}
//         onChange={(e) => props.onChange(e.target.value)}
//         onBlur={props.onBlur}
//         placeholder={props.placeholder}
//       />
//     )}
//     {props.control === "textarea" && (
//       <textarea
//         className={[
//           !props.valid ? "invalid" : "valid",
//           props.touched ? "touched" : "untouched",
//         ].join(" ")}
//         id={props.id}
//         rows={props.rows}
//         required={props.required}
//         value={props.value}
//         onChange={(e) => props.onChange(e.target.value)}
//         onBlur={props.onBlur}
//       />
//     )}
//   </div>
// );

// export default Input;

import React from "react";
import "./styles/Input.css";

const Input = ({
  id,
  label,
  control,
  value,
  valid,
  touched,
  onChange,
  onBlur,
  rows,
}) => (
  <div className="input">
    {label && <label htmlFor={id}>{label}</label>}
    {control === "input" ? (
      <input
        className={`${!valid && touched ? "invalid" : ""} ${
          touched ? "touched" : ""
        }`}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <textarea
        className={`${!valid && touched ? "invalid" : ""} ${
          touched ? "touched" : ""
        }`}
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
  </div>
);

export default Input;
