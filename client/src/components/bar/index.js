import React from "react";

// eslint-disable-next-line
import styles from "./styles.scss";

const Bar = ({ title, text }) => {
  return (
    <div className="team-bar">
      {title && <div className="team-bar-title">{title}</div>}
      {text && <div className="team-bar-text">{text}</div>}
    </div>
  );
};

export default Bar;
