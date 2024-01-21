import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-success p-3 w-100 "
      style={{ borderRadius: "10px" }}
    >
      {children}
    </button>
  );
};

export default Button;
