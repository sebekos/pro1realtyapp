import React, { useEffect } from "react";
import { Cover, Sponsors, Bar, List } from "components";
import TeamImg from "img/team.jpg";
import { connect } from "react-redux";
import { loadNews } from "reduxStore";
import LandingImg from "img/landing.jpg";

const News = ({ loadNews, news, loading, firstLoad }) => {
  useEffect(() => {
    !firstLoad && loadNews();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Cover text="NEWS/MEDIA" src={LandingImg} />
      <Bar title="NEWS/MEDIA" />
      <List data={news} loading={loading} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news.news,
  loading: state.news.loading,
  firstLoad: state.news.firstLoad,
});

const mapDispatchToProps = {
  loadNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
