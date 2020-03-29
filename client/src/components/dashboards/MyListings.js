import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getRefinedListings } from "../../Redux/actions/listing";
import { getProfile } from "../../Redux/actions/profile";
import Pagination from "../listing/Pagination";
import SearchBar from "../listing/SearchBar";

const Dashboard = ({ auth: { user }, listing: { listings, loading, pages }, profile: { profile }, getRefinedListings, getProfile }) => {
    useEffect(() => {
        getProfile();
        if (user) {
            getRefinedListings({
                agentid: user._id
            });
        }
    }, [user]);

    const [formData, setFormData] = useState({
        zipcode: "",
        type: "Newest",
        group: "All",
        agentid: "",
        page: "0"
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSearch = () => {
        const sendData = {
            ...formData,
            agentid: user._id
        };
        getRefinedListings(sendData);
    };

    const pageClick = data => {
        const sendData = {
            ...formData,
            agentid: user._id,
            page: data.selected
        };
        getRefinedListings(sendData);
    };

    return (
        <Fragment>
            {profile ? (
                <Link to="/addlisting" className="btn btn-primary my-1">
                    Add New Listing
                </Link>
            ) : (
                <Fragment>
                    <div className="text-dark medium">You must create a profile before adding listings</div>
                    <Link to="/addprofile" className="btn btn-primary my-1">
                        Add Profile
                    </Link>
                </Fragment>
            )}
            <div className="listings-view">
                {loading ? <Spinner /> : null}
                <SearchBar onChange={onChange} onSearch={onSearch} data={formData} />
                {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} /> : null}
                {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    listing: PropTypes.object.isRequired,
    getRefinedListings: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    listing: state.listing,
    profile: state.profile
});

export default connect(mapStateToProps, { getRefinedListings, getProfile })(Dashboard);
