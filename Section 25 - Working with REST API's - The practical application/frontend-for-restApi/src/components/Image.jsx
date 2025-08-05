// import React from "react";

// import "./styles/Image.css";

// const image = (props) => (
//   <div
//     className="image"
//     style={{
//       backgroundImage: `url('${props.imageUrl}')`,
//       backgroundSize: props.contain ? "contain" : "cover",
//       backgroundPosition: props.left ? "left" : "center",
//     }}
//   />
// );

// export default image;

import React from "react";
import "./styles/Image.css";

const Image = ({ imageUrl, contain, left }) => (
  <div
    className="image"
    style={{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: contain ? "contain" : "cover",
      backgroundPosition: left ? "left" : "center",
      width: "100%",
      height: "auto",
    }}
  />
);

export default Image;
