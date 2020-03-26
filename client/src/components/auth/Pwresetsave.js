import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { pwresetsave } from "../../Redux/actions/auth";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Pwreset = ({ pwresetsave, auth: { loading }, match, history }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: ""
    });

    const { email, password, password2 } = formData;

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            pwresetsave(email, password, match.params.hash, history);
        }
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Password Reset</h1>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Reset" />
            </form>
            {loading ? <Spinner /> : null}
        </Fragment>
    );
};

Pwreset.propTypes = {
    pwresetsave: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { pwresetsave })(Pwreset);
