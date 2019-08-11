import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { getProfile, addProfile, deleteProfile } from '../../Redux/actions/profile';


const EditProfile = ({ getProfile, addProfile, deleteProfile, profile: { profile, loading }, history }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        position: '',
        location: '',
        phone: '',
        email: '',
        photo: ''
    });

    useEffect(() => {
        getProfile();
        setFormData({
            id: loading || !profile._id ? '' : profile._id,
            name: loading || !profile.name ? '' : profile.name,
            position: loading || !profile.position ? '' : profile.position,
            location: loading || !profile.location ? '' : profile.location,
            phone: loading || !profile.phone ? '' : profile.phone,
            email: loading || !profile.email ? '' : profile.email,
            photo: loading || !profile.photo ? '' : profile.photo
        })
    }, [loading, getProfile]);

    const {
        id,
        name,
        position,
        location,
        phone,
        email,
        photo
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addProfile(formData, history);
    }

    const onDelete = e => {
        e.preventDefault();
        if (!window.confirm("This will delete your profile and listings. Press OK to continue")) {
            return;
        }
        deleteProfile();
    }

    const onPhone = e => {
        formData.phone = e.value;
        setFormData({ ...formData, [phone]: '' });
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Profile Information
            </h1>
            <img src={photo} alt="" />
            <p><Link className="btn btn-light my-1" to="/editprofile/avatar">Add/Edit Avatar</Link></p>
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
                    <NumberFormat
                        format="(###) ###-####"
                        mask=""
                        name="phone"
                        placeholder="Phone Number Here"
                        onValueChange={e => onPhone(e)}
                        value={phone}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                <button className="btn btn-danger my-1" onClick={e => onDelete(e)} type="button">Delete</button>
            </form>
        </Fragment >
    )
}

EditProfile.propTypes = ({
    getProfile: PropTypes.func.isRequired,
    addProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteProfile: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, addProfile, deleteProfile })(withRouter(EditProfile));
