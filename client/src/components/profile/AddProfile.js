import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { addProfile } from '../../Redux/actions/profile';


const AddProfile = ({ addProfile, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        location: '',
        phone: '',
        email: ''
    });

    const {
        name,
        position,
        location,
        phone,
        email,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addProfile(formData, history);
        console.log(formData);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Profile Information
            </h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Position" name="position" value={position} onChange={e => onChange(e)} />
                </div>
                <small className="form-text">* Broker, agent, assistant, etc...</small>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <small className="form-text">* Chicago Land Area, Great Lakes, etc...</small>
                <div className="form-group">
                    <input type="text" placeholder="Phone" name="phone" value={phone} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment >
    )
}

AddProfile.propTypes = ({
    addProfile: PropTypes.func.isRequired
})

export default connect(null, { addProfile })(withRouter(AddProfile));
