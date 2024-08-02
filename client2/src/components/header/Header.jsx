import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <img src={`./pro1realtylogo.png`} alt="" className="header-logo" />
      </div>
      <div className="header-link-div">
        <Link to={"/"}>About</Link>
      </div>
      <div className="header-link-div">
        <Link to={"/agents"}>Agents</Link>
      </div>
      <div className="header-link-div">
        <Link to={"/contact"}>Contact</Link>
      </div>
    </div>
  );
};

export default Header;
