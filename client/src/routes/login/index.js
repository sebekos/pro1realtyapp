import React, { useState } from "react";
import { Input, GenericButton } from "components";
import { connect } from "react-redux";
import { register, login } from "reduxStore";
import { Navigate } from "react-router";

// eslint-disable-next-line
import styles from "./styles.scss";

const Login = ({ register, login, loading, errors, isAuth }) => {
  const [logreg, setLogReg] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    register_key: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = () => {
    logreg ? register(form) : login(form);
  };

  const { email, password, password2, register_key } = form;

  if (isAuth) return <Navigate to="/editteam" />;

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-title">{logreg ? "Register" : "Login"}</div>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "email")}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          error={errors && errors.find((o) => o.param === "password")}
        />
        {logreg && (
          <>
            <Input
              name="password2"
              type="password"
              placeholder="Retype Password"
              value={password2}
              onChange={onChange}
            />
            <Input
              name="register_key"
              type="text"
              placeholder="Key"
              value={register_key}
              onChange={onChange}
              error={errors && errors.find((o) => o.param === "register_key")}
            />
          </>
        )}
        <GenericButton label="Submit" onClick={onSubmit} disabled={loading} />
        <div className="rl" onClick={() => setLogReg(!logreg)}>
          RL
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = { register, login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
