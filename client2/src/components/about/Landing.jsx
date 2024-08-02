import React from "react";
import "./styles.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <img
        src={`./home.jpg`}
        alt="Landing Page Image"
        className="landing-page-image"
      />
      <img src={`./pro1realtylogo.png`} alt="" className="landing-page-logo" />
      <h1 className="landing-page-title">
        List your home or find a new one today
      </h1>
    </div>
  );
};

export default Landing;
