import React from "react";
import Landing1 from "img/landing1.jpeg";
import Landing2 from "img/landing2.jpg";
import { GenericButton } from "components";
import { Link } from "react-router-dom";

const Schedule = () => {
  return (
    <div className="dualinfo-container">
      <div className="dualinfo">
        <div className="dualinfo-img-container">
          <img className="dualinfo-img" alt="landing1" src={Landing1} />
        </div>
        <div className="dualinfo-text-container">
          <div className="dualinfo-title">
            Your home is one of your largest investments
          </div>
          <div className="dualinfo-text">
            When hiring a real estate agent to help you buy or sell a home, you
            want a REALTOR® who has the expertise and professionalism to treat
            you and your home with the respect it deserves.
          </div>
          <div className="dualinfo-btn-container">
            <Link to="/team">
              <GenericButton label="Our Agents" />
            </Link>
          </div>
        </div>
        <div className="dualinfo-text-container">
          <div className="dualinfo-title">Stay on track and in control</div>
          <div className="dualinfo-text">
            Since most of us buy or sell a home infrequently, you can count on
            Pro 1 Realty to provide excellent guidance and education every step
            of the way - whether you’re buying your first home or selling your
            twentieth.
          </div>
          <div className="dualinfo-btn-container">
            <Link to="/contact">
              <GenericButton label="Contact Us" />
            </Link>
          </div>
        </div>
        <div className="dualinfo-img-container">
          <img className="dualinfo-img" alt="landing2" src={Landing2} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
