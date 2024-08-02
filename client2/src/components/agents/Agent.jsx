import React from "react";

const Agent = ({ data }) => {
  const { firstName, lastName, title, info, avatar_link } = data;
  return (
    <div className="agent-container">
      <div className="agent-image-container">
        <img
          src={avatar_link || `./avatar.jpg`}
          alt=""
          className="agent-image"
        />
      </div>
      <div className="agent-info-container">
        <div className="agent-info-title">
          {firstName || ""} {lastName || ""}
        </div>
        <div className="agent-info-info">{title || ""}</div>
      </div>
    </div>
  );
};

export default Agent;
