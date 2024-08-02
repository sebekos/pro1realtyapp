import React from "react";

const Tabs = () => {
  return (
    <div className="tabs-page-container">
      <div className="tabs-page-inner">
        <div>
          <img src={`./landing1.jpeg`} alt="" className="tab-logo-img" />
        </div>
        <div className="tab-info-container">
          <div className="tab-info-title">
            Your home is one of your largest investments
          </div>
          <div className="tab-info-info">
            When hiring a real estate agent to help you buy or sell a home, you
            want a REALTOR® who has the expertise and professionalism to treat
            you and your home with the respect it deserves.
          </div>
        </div>
        <div className="tab-info-container">
          <div className="tab-info-title">Stay on track and in control</div>
          <div className="tab-info-info">
            Since most of us buy or sell a home infrequently, you can count on
            Pro 1 Realty to provide excellent guidance and education every step
            of the way - whether you’re buying your first home or selling your
            twentieth.
          </div>
        </div>
        <div>
          <img src={`./landing2.jpg`} alt="" className="tab-logo-img" />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
