import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getListings } from "../../Redux/actions/listing";
import ListingSummaryItem from "./ListingSummaryItem";
import ListingSearch from "./ListingSearch";
import ReactPaginate from "react-paginate";

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
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            {loading ? <Spinner /> : null}
            {/* {listings.length > 0 ? (
                listings.map(listing => (
                    <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>
                        Listing
                    </ListingSummaryItem>
                ))
            ) : (
                <div className="text-center">No Listings</div>
            )} */}
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
