import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../Redux/actions/profile';
import Profile from '../profile/Profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, []);


    return loading ? <Spinner /> :
        <Fragment>
            <div className="posts">
                {profiles.map(profile => (
                    <Profile key={profile._id} profile={profile} />
                ))}
            </div>
        </Fragment>
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
