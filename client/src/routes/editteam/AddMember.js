import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, GenericButton } from "components";
import { updateTeam } from "reduxStore";

// eslint-disable-next-line
import styles from "./styles.scss";

const AddMember = ({ errors, loading, updateTeam }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    info: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateTeam(form);

  const { firstName, lastName, title, info } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
        <div className="editteam-title">Add Member</div>
        <Input
          name="firstName"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "firstName")}
        />
        <Input
          name="lastName"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "lastName")}
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
          name="info"
          type="text"
          placeholder="Info"
          value={info}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "info")}
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

const mapDispatchToProps = { updateTeam };

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
