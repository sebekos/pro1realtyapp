import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { getProfile, addProfile } from '../../Redux/actions/profile';


const EditProfile = ({ getProfile, addProfile, profile: { profile, loading }, history }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        position: '',
        location: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        getProfile();
        setFormData({
            id: loading || !profile._id ? '' : profile._id,
            name: loading || !profile.name ? '' : profile.name,
            position: loading || !profile.position ? '' : profile.position,
            location: loading || !profile.location ? '' : profile.location,
            phone: loading || !profile.phone ? '' : profile.phone,
            email: loading || !profile.email ? '' : profile.email
        })
    }, [loading]);

    const {
        id,
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

    const onDelete = e => {
        e.preventDefault();
        console.log('Deleting:' + profile._id);
        // deleteListing(listing._id, history);
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
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Phone" name="phone" value={phone} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                <button className="btn btn-danger my-1" to="/dashboard" onClick={e => onDelete(e)} type="button">Delete</button>
            </form>
        </Fragment >
    )
}

EditProfile.propTypes = ({
    getProfile: PropTypes.func.isRequired,
    addProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
})

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, addProfile })(withRouter(EditProfile));
