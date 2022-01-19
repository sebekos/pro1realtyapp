import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTeam, updateTeam } from "reduxStore";
import { Input, GenericButton, ImageCropper } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const EditMember = ({ member, errors, updateTeam }) => {
  const [form, setForm] = useState({
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    title: member.title,
    info: member.info,
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => updateTeam(form);

  const onDelete = () => updateTeam({ ...form, deleted: 1 });

  const { firstName, lastName, title, info } = form;

  return (
    <div className="editteam-container">
      <div className="editteam">
        <ImageCropper memberId={form.id} avatar_link={form.avatar_link} />
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
        <div className="editmember-btns-container">
          <GenericButton label="Delete" onClick={onDelete} color="negative" />
          <GenericButton label="Submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const Members = ({ loadTeam, loading, team, updateTeam, refresh }) => {
  useEffect(() => {
    loadTeam();
    // eslint-disable-next-line
  }, [refresh]);

  const orderedTeam = team.sort((a, b) => b.id - a.id);

  return (
    <div className="member-container">
      {orderedTeam.map((o) => (
        <EditMember
          key={`editmember-${o.id}`}
          member={o}
          updateTeam={updateTeam}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.team.team,
  loading: state.team.loading,
  refresh: state.team.refresh,
});

const mapDispatchToProps = {
  loadTeam,
  updateTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
