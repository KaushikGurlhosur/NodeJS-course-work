// // // import React from "react";

// // // import "./styles/Input.css";

// // // const input = (props) => (
// // //   <div className="input">
// // //     {props.label && <label htmlFor={props.id}>{props.label}</label>}
// // //     {props.control === "input" && (
// // //       <input
// // //         className={[
// // //           !props.valid ? "invalid" : "valid",
// // //           props.touched ? "touched" : "untouched",
// // //         ].join(" ")}
// // //         type={props.type}
// // //         id={props.id}
// // //         value={props.value || ""}
// // //         onChange={(e) => props.onChange(e.target.value)}
// // //         onBlur={props.onBlur}
// // //         placeholder={props.placeholder}
// // //       />
// // //     )}
// // //     {props.control === "textarea" && (
// // //       <textarea
// // //         className={[
// // //           !props.valid ? "invalid" : "valid",
// // //           props.touched ? "touched" : "untouched",
// // //         ].join(" ")}
// // //         id={props.id}
// // //         rows={props.rows}
// // //         required={props.required}
// // //         value={props.value}
// // //         onChange={(e) => props.onChange(props.id, e.target.value)}
// // //         onBlur={props.onBlur}
// // //       />
// // //     )}
// // //   </div>
// // // );

// // // export default input;

// // import React from "react";
// // import "./styles/Input.css";

// // const Input = (props) => (
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
// //         onChange={(e) => props.onChange(e.target.value)}
// //         onBlur={props.onBlur}
// //       />
// //     )}
// //   </div>
// // );

// // export default Input;

// // import React from "react";
// // import "./styles/Input.css";

// // const Input = ({
// //   id,
// //   label,
// //   control,
// //   value,
// //   valid,
// //   touched,
// //   onChange,
// //   onBlur,
// //   rows,
// // }) => (
// //   <div className="input">
// //     {label && <label htmlFor={id}>{label}</label>}
// //     {control === "input" ? (
// //       <input
// //         className={`${!valid && touched ? "invalid" : ""} ${
// //           touched ? "touched" : ""
// //         }`}
// //         type="text"
// //         id={id}
// //         value={value}
// //         onChange={onChange}
// //         onBlur={onBlur}
// //       />
// //     ) : (
// //       <textarea
// //         className={`${!valid && touched ? "invalid" : ""} ${
// //           touched ? "touched" : ""
// //         }`}
// //         id={id}
// //         rows={rows}
// //         value={value}
// //         onChange={onChange}
// //         onBlur={onBlur}
// //       />
// //     )}
// //   </div>
// // );

// // export default Input;

// // import React from "react";
// // import "./styles/Input.css";

// // const Input = (props) => {
// //   const handleChange = (e) => {
// //     // Ensure we always pass a string value
// //     const value = typeof e.target.value === "string" ? e.target.value : "";
// //     props.onChange(value);
// //   };

// //   return (
// //     <div className="input">
// //       {props.label && <label htmlFor={props.id}>{props.label}</label>}
// //       {props.control === "input" ? (
// //         <input
// //           className={[
// //             !props.valid ? "invalid" : "valid",
// //             props.touched ? "touched" : "untouched",
// //           ].join(" ")}
// //           type={props.type}
// //           id={props.id}
// //           value={props.value || ""}
// //           onChange={handleChange}
// //           onBlur={props.onBlur}
// //           placeholder={props.placeholder}
// //         />
// //       ) : (
// //         <textarea
// //           className={[
// //             !props.valid ? "invalid" : "valid",
// //             props.touched ? "touched" : "untouched",
// //           ].join(" ")}
// //           id={props.id}
// //           rows={props.rows}
// //           value={props.value || ""}
// //           onChange={handleChange}
// //           onBlur={props.onBlur}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Input;

// import React from "react";
// import "./styles/Input.css";

// const Input = (props) => {
//   const handleChange = (e) => {
//     // Handle both direct values and event objects
//     const value = e?.target?.value ?? e;

//     // Determine how to call the parent onChange based on its expected parameters
//     try {
//       if (typeof props.onChange === "function") {
//         if (props.onChange.length === 1) {
//           // For Login form (expects value only)
//           props.onChange(value);
//         } else {
//           // For FeedEdit form (expects id and value)
//           props.onChange(props.id, value);
//         }
//       }
//     } catch (error) {
//       console.error("Error in Input onChange handler:", error);
//     }
//   };

//   return (
//     <div className="input">
//       {props.label && <label htmlFor={props.id}>{props.label}</label>}
//       {props.control === "input" ? (
//         <input
//           className={[
//             !props.valid ? "invalid" : "valid",
//             props.touched ? "touched" : "untouched",
//           ].join(" ")}
//           type={props.type || "text"}
//           id={props.id}
//           value={props.value || ""}
//           onChange={handleChange}
//           onBlur={props.onBlur}
//           placeholder={props.placeholder}
//         />
//       ) : (
//         <textarea
//           className={[
//             !props.valid ? "invalid" : "valid",
//             props.touched ? "touched" : "untouched",
//           ].join(" ")}
//           id={props.id}
//           rows={props.rows || 5}
//           value={props.value || ""}
//           onChange={handleChange}
//           onBlur={props.onBlur}
//         />
//       )}
//     </div>
//   );
// };

// export default Input;

import React from "react";
import "./styles/Input.css";

const Input = ({
  id,
  label,
  control,
  type,
  value,
  valid,
  touched,
  onChange,
  onBlur,
  placeholder,
  rows,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      {control === "input" ? (
        <input
          className={`${!valid ? "invalid" : "valid"} ${
            touched ? "touched" : "untouched"
          }`}
          type={type || "text"}
          id={id}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          className={`${!valid ? "invalid" : "valid"} ${
            touched ? "touched" : "untouched"
          }`}
          id={id}
          rows={rows || 5}
          value={value || ""}
          onChange={handleChange}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default Input;
