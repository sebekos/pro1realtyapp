import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../Redux/actions/auth";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";

const RegisterContainer = styled.div`
    max-width: 400px;
    margin: auto;
    box-sizing: border-box;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const FormContainer = styled(GenForm)`
    max-width: 400px;
    padding: 0 20px 20px;
`;

const RegisterTextContainer = styled.div`
    padding: 20px 20px;
`;

const LoginButton = styled(PrimaryButton)`
    margin-right: 5px;
`;

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
        <RegisterContainer>
            <RegisterTextContainer>
                <p className="lead">
                    <i className="fas fa-user"></i> Create Your Account
                </p>
            </RegisterTextContainer>
            <FormContainer onSubmit={onSubmitHandler}>
                <GenInput type="text" placeholder="Name" name="name" value={name} onChange={onChangeHandler}></GenInput>
                <GenInput type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler}></GenInput>
                <GenInput type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler}></GenInput>
                <GenInput
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={onChangeHandler}
                ></GenInput>
                <GenInput
                    type="password"
                    placeholder="Registration Key"
                    name="registerkey"
                    value={registerkey}
                    onChange={onChangeHandler}
                ></GenInput>
                <PrimaryButton type="submit" className="btn btn-primary" value="Register">
                    Submit
                </PrimaryButton>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </FormContainer>
        </RegisterContainer>
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
