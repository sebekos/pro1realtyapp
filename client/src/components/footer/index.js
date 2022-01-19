import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line
import styles from "./style.scss";

const index = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <div className="footer-title">Pro 1 Realty Inc.</div>
          <div className="footer-info">
            <div>pro1realtyinc@gmail.com</div>
            <div>(630) 297-8088</div>
            <div className="footer-legal">
              <Link to="/login">
                Pro 1 realty is a Real Estate brokerage located at 6900 Main St.
                Suite #153, Downers Grove, IL. Pro 1 Realty abides by all equal
                opportunity housing laws.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
