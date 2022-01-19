import React from "react";

// eslint-disable-next-line
import styles from "./styles.scss";

const Input = ({ type, value, name, onChange, placeholder, error }) => {
  return (
    <div className="form-input-container">
      <div className="form-input-label">{placeholder}</div>
      <input
        className={`form-input ${error && `form-input-error`}`}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
