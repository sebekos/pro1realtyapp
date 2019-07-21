import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getUserListings } from '../../Redux/actions/listing';
import ListingSummaryItem from './ListingSummaryItem';

const Listings = ({ getUserListings, listing: { listings, loading } }) => {
    useEffect(() => {
        getUserListings();
    }, [loading]);


    return loading ? <Spinner /> :
        <Fragment>
            <div className="posts">
                {listings.map(listing => (
                    <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>Listing</ListingSummaryItem>
                ))}
            </div>
        </Fragment>
}

Listings.propTypes = {
    getUserListings: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { getUserListings })(Listings);
