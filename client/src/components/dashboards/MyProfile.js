import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../Redux/actions/profile";
import { getUserListings } from "../../Redux/actions/listing";
import Profile from "../profile/Profile";

const Dashboard = ({
  auth: { user },
  getProfile,
  profile: { profile },
  getUserListings
}) => {
  useEffect(() => {
    getProfile();
    getUserListings();
  }, [getProfile, getUserListings]);

  return (
    <Fragment>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      <div className="between"></div>
      <h1 className="large text-primary">My Profile</h1>
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
          <div className="text-dark medium">
            You do not have a profile yet. Click add profile
          </div>
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
  profile: PropTypes.object.isRequired,
  getUserListings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, getUserListings })(
  Dashboard
);
