import React, { useEffect } from "react";
import { Cover, Sponsors, Table, Bar } from "components";
import { connect } from "react-redux";
import { loadSchedule } from "reduxStore";
import TeamImg from "img/team.jpg";

const Schedule = ({ loadSchedule, schedule, loading, firstLoad }) => {
  useEffect(() => {
    !firstLoad && loadSchedule();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Cover text="TEAM" src={TeamImg} />
      <Bar title="RACE SCHEDULE" />
      <Table rows={schedule} loading={loading} />
      <Sponsors />
    </div>
  );
};

const mapStateToProps = (state) => ({
  schedule: state.schedule.schedule,
  loading: state.schedule.loading,
  firstLoad: state.schedule.firstLoad,
});

const mapDispatchToProps = {
  loadSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
