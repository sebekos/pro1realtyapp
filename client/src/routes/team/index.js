import React, { useEffect } from "react";
import { Cover, Bar, Grid } from "components";
import { connect } from "react-redux";
import { loadTeam } from "reduxStore";
import LandingImg from "img/landing.jpg";

const Team = ({ loadTeam, team, loading, firstLoad }) => {
  useEffect(() => {
    !firstLoad && loadTeam();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Cover text="TEAM" src={LandingImg} />
      <Bar title="Our Agents" />
      <Grid data={team} loading={loading} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.team.team,
  loading: state.team.loading,
  firstLoad: state.team.firstLoad,
});

const mapDispatchToProps = {
  loadTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
