import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAgentListings } from '../../Redux/actions/listing';
import ListingSummaryItem from './ListingSummaryItem';

const Listings = ({ getAgentListings, listing: { listings, loading }, match }) => {
    useEffect(() => {
        getAgentListings(match.params.id);
    }, [getAgentListings]);

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
    getAgentListings: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { getAgentListings })(Listings);
