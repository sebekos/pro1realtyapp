import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getRefinedListings } from "../../Redux/actions/listing";
import { getProfile } from "../../Redux/actions/profile";
import Pagination from "../listing/Pagination";
import SearchBar from "../listing/SearchBar";
import styled from "styled-components";
import GreenButton from "../universal/GreenButton";
import PrimaryButton from "../universal/PrimaryButton";
import LightButton from "../universal/LightButton";

const Container = styled.div`
    margin: auto;
`;

const AddProfileContainer = styled.div`
    margin: auto;
`;

const MediumText = styled.div`
    font-size: 1rem;
    margin: 10px auto;
`;

const ProfileContainer = () => {
    return (
        <AddProfileContainer>
            <MediumText>You must create a profile before adding listings</MediumText>
            <Link to="/addprofile">
                <PrimaryButton>Add Profile</PrimaryButton>
            </Link>
        </AddProfileContainer>
    );
};

const AddListingContainer = styled.div`
    margin: auto;
`;

const AddListingButton = styled(GreenButton)`
    margin-right: 10px;
`;

const AddListing = () => {
    return (
        <AddListingContainer>
            <Link to="/addlisting">
                <AddListingButton>Add Listing</AddListingButton>
            </Link>
            <Link to="/myprofile">
                <LightButton>My Profile</LightButton>
            </Link>
        </AddListingContainer>
    );
};

const ListingsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

const Listings = ({ onChange, onSearch, formData, pageClick, pages, listings, loading }) => {
    return (
        <ListingsContainer>
            <SearchBar onChange={onChange} onSearch={onSearch} data={formData} />
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} /> : null}
            {!loading && listings.length === 0 ? <MediumText>No listings matching criteria</MediumText> : null}
        </ListingsContainer>
    );
};

Listings.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    pageClick: PropTypes.func.isRequired,
    formData: PropTypes.object,
    pages: PropTypes.number,
    listings: PropTypes.array,
    loading: PropTypes.bool
};

const MyListings = ({ auth: { user }, listing: { listings, loading, pages }, profile: { profile }, getRefinedListings, getProfile }) => {
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

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSearch = () => {
        const sendData = {
            ...formData,
            agentid: user._id
        };
        getRefinedListings(sendData);
    };

    const pageClick = (data) => {
        const sendData = {
            ...formData,
            agentid: user._id,
            page: data.selected
        };
        getRefinedListings(sendData);
    };

    return (
        <Container>
            {loading ? <Spinner /> : null}
            {!loading && profile ? <AddListing /> : null}
            {!loading && !profile ? <ProfileContainer /> : null}
            {!loading && profile ? (
                <Listings
                    onChange={onChange}
                    onSearch={onSearch}
                    formData={formData}
                    pageClick={pageClick}
                    pages={pages}
                    listings={listings}
                    loading={loading}
                />
            ) : null}
        </Container>
    );
};

MyListings.propTypes = {
    auth: PropTypes.object.isRequired,
    listing: PropTypes.object.isRequired,
    getRefinedListings: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    pages: PropTypes.number,
    listings: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    listing: state.listing,
    profile: state.profile
});

const mapDispatchToProps = {
    getRefinedListings,
    getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);
