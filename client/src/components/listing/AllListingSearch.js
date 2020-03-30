import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRefinedListings, setSearch } from "../../Redux/actions/listing";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Spinner from "../layout/Spinner";

const AllListingSearch = ({ getRefinedListings, setSearch, listing: { listings, pages, loading, zipcode, type, group, page } }) => {
    useEffect(() => {
        getRefinedListings({
            zipcode,
            type,
            group,
            agentid: "",
            page
        });
    }, [getRefinedListings]);

    const onChange = e => {
        setSearch({
            field: e.target.name,
            data: e.target.value
        });
    };

    const onSearch = () => {
        setSearch({
            field: "page",
            data: 0
        });
        getRefinedListings({
            zipcode,
            type,
            group,
            agentid: "",
            page: 0
        });
    };

    const pageClick = data => {
        setSearch({
            field: "page",
            data: data.selected
        });
        getRefinedListings({
            zipcode,
            type,
            group,
            agentid: "",
            page: data.selected
        });
    };

    return (
        <div className="listings-view">
            {loading ? <Spinner /> : null}
            <SearchBar onChange={onChange} onSearch={onSearch} />
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} currPage={page} /> : null}
            {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
        </div>
    );
};

AllListingSearch.propTypes = {
    getRefinedListings: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

const mapDispatchToProps = {
    getRefinedListings,
    setSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(AllListingSearch);
