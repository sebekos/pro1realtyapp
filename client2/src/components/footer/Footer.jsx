import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-title">Pro 1 Realty Inc.</div>
      <div className="footer-email">pro1realtyinc@gmail.com</div>
      <div className="footer-phone">
        Call us at <a href="tel:+1234567890">(630) 297-8088</a>
      </div>
      <div className="footer-legal">
        Pro 1 realty is a Real Estate brokerage located at 6900 Main St. Suite
        #153, Downers Grove, IL. Pro 1 Realty abides by all equal opportunity
        housing laws.
      </div>
    </div>
  );
};

export default Footer;
