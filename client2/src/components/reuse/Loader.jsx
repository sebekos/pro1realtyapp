import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div>
        <img
          src={`./loader.gif`}
          alt="Loading..."
          style={{
            maxWidth: 30,
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
