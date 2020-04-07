import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getRefinedListings, setSearch } from "../../Redux/actions/listing";
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

const TitleContainer = styled.div`
    margin: auto;
`;

const LeadText = styled.p`
    font-size: 1.5rem;
`;

const Between = styled.div`
    width: 100%;
    border-bottom: 3px solid grey;
`;

const Title = () => {
    return (
        <TitleContainer>
            <LeadText>My Listings</LeadText>
            <Between />
        </TitleContainer>
    );
};

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
    margin: 10px auto;
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

const Listings = ({ onChange, onSearch, pageClick, pages, page, listings, loading }) => {
    return (
        <ListingsContainer>
            <SearchBar onChange={onChange} onSearch={onSearch} />
            {listings.length > 0 ? <Pagination pageClick={pageClick} pages={pages} listings={listings} currPage={page} /> : null}
            {!loading && listings.length === 0 ? <div className="text-center">No listings matching criteria</div> : null}
        </ListingsContainer>
    );
};

Listings.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    pageClick: PropTypes.func.isRequired,
    pages: PropTypes.number,
    listings: PropTypes.array,
    loading: PropTypes.bool
};

const MyListings = ({
    auth: { user },
    listing: { listings, loading, zipcode, type, group, page, pages },
    profile: { profile },
    getRefinedListings,
    getProfile,
    setSearch
}) => {
    useEffect(() => {
        getProfile();
        if (user) {
            getRefinedListings({
                zipcode,
                type,
                group,
                agentid: user._id,
                page: 0
            });
        }
    }, [user]);

    const onChange = (e) => {
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
            agentid: user._id,
            page: 0
        });
    };

    const pageClick = (data) => {
        setSearch({
            field: "page",
            data: data.selected
        });
        getRefinedListings({
            zipcode,
            type,
            group,
            agentid: user._id,
            page: data.selected
        });
    };

    return (
        <Container>
            <Title />
            {loading ? <Spinner /> : null}
            {profile ? <AddListing /> : null}
            {!loading && !profile ? <ProfileContainer /> : null}
            <Listings
                onChange={onChange}
                onSearch={onSearch}
                pageClick={pageClick}
                listings={listings}
                loading={loading}
                pages={pages}
                page={page}
            />
        </Container>
    );
};

MyListings.propTypes = {
    auth: PropTypes.object.isRequired,
    listing: PropTypes.object.isRequired,
    getRefinedListings: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    listings: PropTypes.array,
    loading: PropTypes.bool,
    setSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    listing: state.listing,
    profile: state.profile
});

const mapDispatchToProps = {
    getRefinedListings,
    getProfile,
    setSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);
