import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getListings } from '../../Redux/actions/listing';
import ListingSummaryItem from './ListingSummaryItem';

const Listings = ({ getListings, listing: { listings, loading } }) => {
    useEffect(() => {
        getListings();
    }, [getListings]);

    return loading ? <Spinner /> :
        <Fragment>
            <div className="posts">
                {listings.length > 0 ? listings.map(listing => (
                    <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>Listing</ListingSummaryItem>
                )) : <div className='text-primary large'>There are currently no listings</div>}
            </div>
        </Fragment>
}

Listings.propTypes = {
    getListings: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { getListings })(Listings);
