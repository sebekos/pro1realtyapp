import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../Redux/actions/profile";
import Profile from "../profile/Profile";
import styled from "styled-components";

const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: fit-content;
    margin: auto;
    @media (max-width: 1280px) {
        grid-template-columns: 1fr;
    }
    @media (max-width: 680px) {
        margin-top: 1rem;
    }
`;

const NoResults = styled.div`
    width: fit-content;
    text-align: center;
    margin: auto;
`;

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <>
            {!loading && profiles.length === 0 ? <NoResults>No agents found</NoResults> : null}
            <ProfileContainer>
                {loading ? <Spinner /> : null}
                {profiles.length > 0 ? profiles.map((profile) => <Profile key={profile._id} profile={profile} />) : null}
            </ProfileContainer>
        </>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

const mapDispatchToProps = {
    getProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
