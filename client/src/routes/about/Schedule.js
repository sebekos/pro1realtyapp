import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSchedule } from "reduxStore";
import Landing1 from "img/landing1.jpeg";
import Landing2 from "img/landing2.jpg";

const Schedule = ({ loadSchedule, schedule, firstLoad, loading }) => {
  useEffect(() => {
    !firstLoad && loadSchedule();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="dualinfo-container">
      <div className="dualinfo">
        <div className="dualinfo-img-container">
          <img className="dualinfo-img" src={Landing1} />
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
        </div>
        <div className="dualinfo-text-container">
          <div className="dualinfo-title">Stay on track and in control</div>
          <div className="dualinfo-text">
            Since most of us buy or sell a home infrequently, you can count on
            Pro 1 Realty to provide excellent guidance and education every step
            of the way - whether you’re buying your first home or selling your
            twentieth.
          </div>
        </div>
        <div className="dualinfo-img-container">
          <img className="dualinfo-img" src={Landing2} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  schedule: state.schedule.schedule,
  firstLoad: state.schedule.firstLoad,
  loading: state.schedule.loading,
});

const mapDispatchToProps = {
  loadSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
