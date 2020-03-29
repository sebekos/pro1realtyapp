import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getRefinedListings } from "../../Redux/actions/listing";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Spinner from "../layout/Spinner";

const AgentListingSearch = ({ getRefinedListings, listing: { listings, pages, loading }, match }) => {
    useEffect(() => {
        getRefinedListings({
            agentid: match.params.id
        });
    }, [getRefinedListings]);

    const [formData, setFormData] = useState({
        zipcode: "",
        type: "Newest",
        group: "All",
        agentid: match.params.id,
        page: "0"
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSearch = () => {
        getRefinedListings(formData);
    };

    const pageClick = data => {
        const sendData = {
            ...formData,
            agentid: match.params.id,
            page: data.selected
        };
        console.log(sendData);
        getRefinedListings(sendData);
    };

    return (
        <div className="listings-view">
            {loading ? <Spinner /> : null}
            <SearchBar onChange={onChange} onSearch={onSearch} data={formData} />
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} /> : null}
            {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
        </div>
    );
};

AgentListingSearch.propTypes = {
    getRefinedListings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

const mapDispatchToProps = {
    getRefinedListings
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentListingSearch);
