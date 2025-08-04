// import React from "react";

// import "./styles/Input.css";

// const filePicker = (props) => (
//   <div className="input">
//     <label htmlFor={props.id}>{props.label}</label>
//     <input
//       className={[
//         !props.valid ? "invalid" : "valid",
//         props.touched ? "touched" : "untouched",
//       ].join(" ")}
//       type="file"
//       id={props.id}
//       onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
//       onBlur={props.onBlur}
//     />
//   </div>
// );

// export default filePicker;

import React from "react";
import "./styles/Input.css";

const FilePicker = (props) => {
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      props.onChange(e.target.files[0]); // Pass the first file only
    }
  };

  return (
    <div className="input">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        className={[
          !props.valid ? "invalid" : "valid",
          props.touched ? "touched" : "untouched",
        ].join(" ")}
        type="file"
        id={props.id}
        accept="image/*"
        onChange={handleChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default FilePicker;
