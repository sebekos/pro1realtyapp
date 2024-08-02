import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="header-container">
      <div>
        <img
          src={`./pro1realtylogo.png`}
          alt=""
          className="header-logo"
          style={{
            maxWidth: 150,
          }}
        />
      </div>
      <div className="dropdown-menu-normal">
        <div>
          <Link to="/">About</Link>
        </div>
        <div>
          <Link to="/agents">Agents</Link>
        </div>
        <div>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="mobile-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={`./mobileicon.png`} alt="" />
      </div>
      {menuOpen && (
        <div className="dropdown-menu">
          <div>
            <Link to="/" onClick={handleCloseMenu}>
              About
            </Link>
          </div>
          <div>
            <Link to="/agents" onClick={handleCloseMenu}>
              Agents
            </Link>
          </div>
          <div>
            <Link to="/contact" onClick={handleCloseMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
