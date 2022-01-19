import React from "react";

// eslint-disable-next-line
import styles from "./style.scss";

const index = ({ src, text }) => {
  return (
    <div className="pageCover">
      <img className="pageCoverImg" src={src} alt="AiBC" />
      <div className="pageCentered">
        {/* <div className="pageSpecial">{text}</div> */}
      </div>
    </div>
  );
};

export default index;
