// import React from "react";

// import "./styles/Paginator.css";

// const paginator = (props) => (
//   <div className="paginator">
//     {props.children}
//     <div className="paginator__controls">
//       {props.currentPage > 1 && (
//         <button className="paginator__control" onClick={props.onPrevious}>
//           Previous
//         </button>
//       )}
//       {props.currentPage < props.lastPage && (
//         <button className="paginator__control" onClick={props.onNext}>
//           Next
//         </button>
//       )}
//     </div>
//   </div>
// );

// export default paginator;
import React from "react";
import "./styles/Paginator.css";

const Paginator = ({ children, currentPage, lastPage, onPrevious, onNext }) => (
  <div className="paginator">
    {children}
    <div className="paginator__controls">
      {currentPage > 1 && (
        <button className="paginator__control" onClick={onPrevious}>
          Previous
        </button>
      )}
      {currentPage < lastPage && (
        <button className="paginator__control" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

export default Paginator;
