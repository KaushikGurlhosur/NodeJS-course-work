// import React from "react";

// import Image from "./Image";
// import "./styles/Avatar.css";

// const avatar = (props) => (
//   <div
//     className="avatar"
//     style={{ width: props.size + "rem", height: props.size + "rem" }}
//   >
//     <Image imageUrl={props.image} />
//   </div>
// );

// export default avatar;
import React from "react";
import Image from "./Image";
import "./styles/Avatar.css";

const Avatar = ({ image, size }) => (
  <div className="avatar" style={{ width: `${size}rem`, height: `${size}rem` }}>
    <Image imageUrl={image} />
  </div>
);

export default Avatar;
