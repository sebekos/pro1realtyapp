import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, GenericButton } from "components";
import { updateSchedule } from "reduxStore";

// eslint-disable-next-line
import styles from "./styles.scss";

const AddMember = ({ errors, loading, updateSchedule }) => {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    race: "",
    location: "",
    results: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateSchedule(form);

  const { startDate, endDate, race, location, results } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
        <div className="editteam-title">Add Race</div>
        <Input
          name="startDate"
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "startDate")}
        />
        <Input
          name="endDate"
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "endDate")}
        />
        <Input
          name="race"
          type="text"
          placeholder="Race"
          value={race}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "race")}
        />
        <Input
          name="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "location")}
        />
        <Input
          name="results"
          type="text"
          placeholder="Results"
          value={results}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "results")}
        />
        <GenericButton label="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.team.loading,
  errors: state.team.errors,
});

const mapDispatchToProps = { updateSchedule };

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
