import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadNews, updateNews } from "reduxStore";
import { Input, GenericButton } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const EditSchedule = ({ news, errors, updateNews }) => {
  const [form, setForm] = useState({
    id: news.id,
    date: news.date,
    title: news.title,
    text: news.text,
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateNews(form);

  const onDelete = () => updateNews({ ...form, deleted: 1 });

  const { date, title, text } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
        <Input
          name="date"
          type="date"
          placeholder="Start Date"
          value={date}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "date")}
        />
        <Input
          name="title"
          type="text"
          placeholder="Race"
          value={title}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "title")}
        />
        <Input
          name="text"
          type="text"
          placeholder="Location"
          value={text}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "text")}
        />
        <div className="editmember-btns-container">
          <GenericButton label="Delete" onClick={onDelete} color="negative" />
          <GenericButton label="Submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const Members = ({ loadNews, loading, news, updateNews, refresh }) => {
  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
  }, [refresh]);

  const sortedNews = news.sort((a, b) => b.id - a.id);

  return (
    <div className="member-container">
      {sortedNews.map((o) => (
        <EditSchedule
          key={`editnews-${o.id}`}
          news={o}
          updateNews={updateNews}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news.news,
  loading: state.news.loading,
  refresh: state.news.refresh,
});

const mapDispatchToProps = {
  loadNews,
  updateNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
