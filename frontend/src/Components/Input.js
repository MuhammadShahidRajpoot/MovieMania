// Input.js - Common Input Component
import React from "react";
import "./style.css";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-control custom-input"
    />
  );
};

export default Input;
