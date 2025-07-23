// import { createPortal } from 'react-dom';
// import './styles/Backdrop.css';

// const Backdrop = (props) =>
//   createPortal(
//     <div
//       className={`backdrop ${props.open ? 'open' : ''}`}
//       onClick={props.onClick}
//     />,
//     document.getElementById('backdrop-root')
//   );

// export default Backdrop;

import { createPortal } from "react-dom";
import "./styles/Backdrop.css";

const Backdrop = (props) => {
  if (!props.open) {
    return null; // Don't render anything when not open
  }

  return createPortal(
    <div className="backdrop open" onClick={props.onClick} />,
    document.getElementById("backdrop-root")
  );
};

export default Backdrop;
