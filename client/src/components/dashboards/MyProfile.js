import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../Redux/actions/profile";
import Profile from "../profile/Profile";

const Dashboard = ({ auth: { user }, getProfile, profile: { profile } }) => {
    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            <div className="between"></div>
            {profile ? (
                <Fragment>
                    <Link to="/editprofile" className="btn btn-primary my-1">
                        Edit Profile
                    </Link>
                    <Link className="btn btn-light my-1" to="/editprofile/avatar">
                        Add/Edit Avatar
                    </Link>
                    <Profile profile={profile} />
                </Fragment>
            ) : (
                <Fragment>
                    <div className="text-dark medium">You do not have a profile yet. Click add profile</div>
                    <Link to="/addprofile" className="btn btn-primary my-1">
                        Add Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

const mapDispatchToProps = {
    getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
