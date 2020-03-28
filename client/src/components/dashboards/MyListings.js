import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getRefinedListings } from "../../Redux/actions/listing";
import { getProfile } from "../../Redux/actions/profile";
import ListingSummaryItem from "../listing/ListingSummaryItem";

const Dashboard = ({ auth: { user }, listing: { listings }, profile: { profile }, getRefinedListings, getProfile }) => {
    useEffect(() => {
        getProfile();
        if (user) {
            getRefinedListings({
                agentid: user._id
            });
        }
    }, [user]);

    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            <div className="between"></div>
            <h1 className="large text-primary">My Listings</h1>
            {profile ? (
                <Link to="/addlisting" className="btn btn-primary my-1">
                    Add Listing
                </Link>
            ) : (
                <Fragment>
                    <div className="text-dark medium">You must create a profile before adding listings</div>
                    <Link to="/addprofile" className="btn btn-primary my-1">
                        Add Profile
                    </Link>
                </Fragment>
            )}
            {listings ? (
                <Fragment>
                    <div className="posts">
                        {listings.length > 0
                            ? listings.map(listing => (
                                  <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>
                                      Listing
                                  </ListingSummaryItem>
                              ))
                            : null}
                    </div>
                </Fragment>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    listing: PropTypes.object.isRequired,
    getRefinedListings: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    listing: state.listing,
    profile: state.profile
});

export default connect(mapStateToProps, { getRefinedListings, getProfile })(Dashboard);
