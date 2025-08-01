import React from "react";

import "./styles/Input.css";

const input = (props) => (
  <div className="input">
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === "input" && (
      <input
        className={[
          !props.valid ? "invalid" : "valid",
          props.touched ? "touched" : "untouched",
        ].join(" ")}
        type={props.type}
        id={props.id}
        value={props.value || ""}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    )}
    {props.control === "textarea" && (
      <textarea
        className={[
          !props.valid ? "invalid" : "valid",
          props.touched ? "touched" : "untouched",
        ].join(" ")}
        id={props.id}
        rows={props.rows}
        required={props.required}
        value={props.value}
        onChange={(e) => props.onChange(props.id, e.target.value)}
        onBlur={props.onBlur}
      />
    )}
  </div>
);

export default input;
