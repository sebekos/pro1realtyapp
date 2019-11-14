import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getListings } from "../../Redux/actions/listing";
import ListingSummaryItem from "./ListingSummaryItem";
import ListingSearch from "./ListingSearch";

const Listings = ({ getListings, listing: { listings, loading } }) => {
  useEffect(() => {
    getListings();
  }, [getListings]);

  return (
    <div className="listings-view">
      <ListingSearch />
      {loading ? <Spinner /> : null}
      {listings.length > 0 ? (
        listings.map(listing => (
          <ListingSummaryItem
            key={listing._id}
            listing={listing}
            listingId={listing._id}
          >
            Listing
          </ListingSummaryItem>
        ))
      ) : (
        <div className="text-center">No Listings</div>
      )}
    </div>
  );
};

Listings.propTypes = {
  getListings: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  listing: state.listing
});

export default connect(mapStateToProps, { getListings })(Listings);
