import React from "react";

// eslint-disable-next-line
import styles from "./styles.scss";

const GenericButton = ({ label, loading, disabled, onClick, color }) => {
  return (
    <button
      disabled={disabled || loading}
      className={`generic-button ${color && `btn-${color}`}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GenericButton;
