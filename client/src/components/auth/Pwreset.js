import React, { useState } from "react";
import { connect } from "react-redux";
import { pwreset } from "../../Redux/actions/auth";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const Pwreset = ({ pwreset }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(0);

    const onChangeHandler = e => setEmail(e.target.value);

    const onSubmitHandler = async e => {
        e.preventDefault();
        setLoading(1);
        await pwreset(email);
        setLoading(0);
    };

    return (
        <div className="login-container">
            <h1 className="large text-primary">Password Reset</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Enter the email associated with your account.
            </p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
            {loading ? <Spinner /> : null}
        </div>
    );
};

Pwreset.propTypes = {
    pwreset: PropTypes.func.isRequired
};

export default connect(null, { pwreset })(Pwreset);
