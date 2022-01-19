import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, GenericButton } from "components";
import { updateNews } from "reduxStore";

// eslint-disable-next-line
import styles from "./styles.scss";

const AddMember = ({ errors, loading, updateNews }) => {
  const [form, setForm] = useState({
    date: "",
    title: "",
    text: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateNews(form);

  const { date, title, text } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
        <div className="editteam-title">Add News</div>
        <Input
          name="date"
          type="date"
          placeholder="Date"
          value={date}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "date")}
        />
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "title")}
        />
        <Input
          name="text"
          type="text"
          placeholder="Text"
          value={text}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "text")}
        />
        <GenericButton label="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.news.loading,
  errors: state.news.errors,
});

const mapDispatchToProps = { updateNews };

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
