import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Listings from '../listing/Listings';

const Dashboard = ({ auth: { user } }) => {
    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user"></i>
                {' '}Welcome {user && user.name}
            </p>
            <h1 className="large text-primary">My Profile</h1>
            <h1 className="large text-primary">My Active Listings</h1>
            <Link to='/addlisting' className='btn btn-primary my-1'>
                Add Listing
            </Link>
            <Listings />
        </Fragment>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Dashboard);
