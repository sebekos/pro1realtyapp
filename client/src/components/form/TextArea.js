import React from "react";

// eslint-disable-next-line
import styles from "./styles.scss";

const TextArea = ({ type, value, name, onChange, placeholder, error }) => {
  return (
    <div className="form-input-container">
      <div className="form-input-label">{placeholder}</div>
      <textarea
        className={`form-textarea ${error && `form-input-error`}`}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        rows="6"
      />
    </div>
  );
};

export default TextArea;
