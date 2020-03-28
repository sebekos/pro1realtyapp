import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getListings } from "../../Redux/actions/listing";
import ListingSearch from "./ListingSearch";
import Pagination from "./Pagination";

const Listings = ({ getListings, listing: { listings, loading, pages } }) => {
    useEffect(() => {
        getListings(0);
    }, [getListings]);

    const pageClick = data => {
        getListings(data.selected);
    };

    return (
        <div className="listings-view">
            <ListingSearch />
            {loading ? <Spinner /> : null}
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} /> : null}
            {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
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
