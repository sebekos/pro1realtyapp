import React from "react";
import LandingImg from "img/landing.jpg";
import Pro1Logo from "img/pro1cyclinglogo.png";

const Cover = () => {
  return (
    <div className="cover">
      <img className="coverImg" src={LandingImg} alt="AiBC" />
      <div className="centered">
        <div className="special">
          <img src={Pro1Logo} alt="Pro 1 Realty" />
        </div>
        <div className="nextSpecial">
          List your home or find a new one today
        </div>
        {/* <div className="nextSpecial">
          <a href="tel:630-930-8572">(630) 930-8572</a>
        </div> */}
      </div>
    </div>
  );
};

export default Cover;
