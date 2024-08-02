import React from "react";

const TitleBar = ({ text }) => {
  return (
    <div className="title-bar-container">
      <div>{text}</div>
    </div>
  );
};

export default TitleBar;
