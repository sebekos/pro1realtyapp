import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadSchedule, updateSchedule } from "reduxStore";
import { Input, GenericButton } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const EditSchedule = ({ schedule, errors, updateSchedule }) => {
  const [form, setForm] = useState({
    id: schedule.id,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    race: schedule.race,
    location: schedule.location,
    results: schedule.results,
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateSchedule(form);

  const onDelete = () => updateSchedule({ ...form, deleted: 1 });

  const { startDate, endDate, race, location, results } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
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
        <div className="editmember-btns-container">
          <GenericButton label="Delete" onClick={onDelete} color="negative" />
          <GenericButton label="Submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const Members = ({
  loadSchedule,
  loading,
  schedule,
  updateSchedule,
  refresh,
}) => {
  useEffect(() => {
    loadSchedule();
    // eslint-disable-next-line
  }, [refresh]);

  const sortedSchdule = schedule.sort((a, b) => b.id - a.id);

  return (
    <div className="member-container">
      {sortedSchdule.map((o) => (
        <EditSchedule
          key={`editschedule-${o.id}`}
          schedule={o}
          updateSchedule={updateSchedule}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  schedule: state.schedule.schedule,
  loading: state.schedule.loading,
  refresh: state.schedule.refresh,
});

const mapDispatchToProps = {
  loadSchedule,
  updateSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
