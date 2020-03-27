import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getListings, setLoadingTrue } from "../../Redux/actions/listing";
import ListingSummaryItem from "./ListingSummaryItem";
import ListingSearch from "./ListingSearch";
import Pagination from "./Pagination";

const Listings = ({ getListings, listing: { listings, loading, pages } }) => {
    const [currPage, setCurrPage] = useState(1);
    const [data, setData] = useState([]);

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
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} /> : null}
            {listings.length > 0
                ? listings.map(listing => (
                      <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>
                          Listing
                      </ListingSummaryItem>
                  ))
                : null}
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} /> : null}
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
