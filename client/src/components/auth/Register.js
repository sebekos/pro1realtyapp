import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../Redux/actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        registerkey: ""
    });

    const { name, email, password, password2, registerkey } = formData;

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            register({ name, email, password, registerkey });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/myprofile" />;
    }

    return (
        <div className="login-container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Registration Key"
                        name="registerkey"
                        value={registerkey}
                        onChange={onChangeHandler}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
