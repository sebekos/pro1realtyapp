import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addProfile } from "../../Redux/actions/profile";
import NumberFormat from "react-number-format";

const AddProfile = ({ addProfile, history }) => {
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        location: "",
        phone: "",
        email: ""
    });

    const { name, position, location, phone, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addProfile(formData, history);
    };

    const onPhone = e => {
        formData.phone = e.value;
        setFormData({ ...formData, [phone]: "" });
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Profile Information</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Visible Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Position" name="position" value={position} onChange={onChange} />
                </div>
                <small className="form-text">* Broker, agent, assistant, etc...</small>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>
                <small className="form-text">* Chicago Land Area, Great Lakes, etc...</small>
                <div className="form-group">
                    <NumberFormat
                        format="(###) ###-####"
                        mask=""
                        name="phone"
                        placeholder="Phone Number"
                        onValueChange={e => onPhone(e)}
                        value={phone}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/myprofile">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

AddProfile.propTypes = {
    addProfile: PropTypes.func.isRequired
};

export default connect(null, { addProfile })(withRouter(AddProfile));
