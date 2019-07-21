import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfile } from '../../Redux/actions/profile';
import { getUserListings } from '../../Redux/actions/listing';
import Profile from '../profile/Profile';
import ListingSummaryItem from '../listing/ListingSummaryItem';

const Dashboard = ({ auth: { user }, getProfile, profile: { profile, loading }, listing: { listings }, getUserListings }) => {

    useEffect(() => {
        getProfile();
        getUserListings();
    }, []);

    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user"></i>
                {' '}Welcome {user && user.name}
            </p>
            <h1 className="large text-primary">My Profile</h1>
            {!loading && profile ? (
                <Fragment>
                    <Link to='/editprofile' className='btn btn-primary my-1'>
                        Edit Profile
                    </Link>
                    <Profile profile={profile} />
                </Fragment>
            ) : <Fragment>
                    <Link to='/addprofile' className='btn btn-primary my-1'>
                        Add Profile
                    </Link>
                </Fragment>}
            <h1 className="large text-primary">My Listings</h1>
            <Link to='/addlisting' className='btn btn-primary my-1'>
                Add Listing
            </Link>
            {!loading && listings ? (
                <Fragment>
                    <div className="posts">
                        {listings.map(listing => (
                            <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>Listing</ListingSummaryItem>
                        ))}
                    </div>
                </Fragment>
            ) : <Spinner />}
        </Fragment>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    listing: PropTypes.object.isRequired,
    getUserListings: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    listing: state.listing
})

export default connect(mapStateToProps, { getProfile, getUserListings })(Dashboard);
