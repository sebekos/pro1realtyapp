import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getRefinedListings } from "../../Redux/actions/listing";
import ListingSearch from "./ListingSearch";

const Listings = ({ getRefinedListings, listing: { listings, loading, pages } }) => {
    useEffect(() => {
        getRefinedListings();
    }, [getRefinedListings]);

    return (
        <div className="listings-view">
            <ListingSearch />
            {loading ? <Spinner /> : null}
            {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
        </div>
    );
};

Listings.propTypes = {
    getRefinedListings: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

export default connect(mapStateToProps, { getRefinedListings })(Listings);
