import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../Redux/actions/profile";
import Profile from "../profile/Profile";
import styled from "styled-components";
import GreenButton from "../universal/GreenButton";
import PrimaryButton from "../universal/PrimaryButton";
import LightButton from "../universal/LightButton";
import Spinner from "../layout/Spinner";

const Container = styled.div`
    margin: auto;
`;

const WelcomeContainer = styled.div`
    margin: auto;
`;

const LeadText = styled.p`
    font-size: 1.5rem;
`;

const Between = styled.div`
    width: 100%;
    border-bottom: 3px solid grey;
`;

const Welcome = ({ name }) => {
    return (
        <WelcomeContainer>
            <LeadText>
                <i className="fas fa-user"></i> Welcome {name}
            </LeadText>
            <Between />
        </WelcomeContainer>
    );
};

Welcome.propTypes = {
    name: PropTypes.string
};

const ProfileContainer = styled.div`
    margin: auto;
`;

const ButtonContainer = styled.div`
    margin: 10px auto 20px;
`;

const MyListingsButton = styled(GreenButton)`
    margin-right: 10px;
`;

const EditProfileButton = styled(LightButton)`
    margin-right: 10px;
`;

const ProfileAndButtons = ({ profile }) => {
    return (
        <ProfileContainer>
            <ButtonContainer>
                <Link to="/mylistings">
                    <MyListingsButton>My Listings</MyListingsButton>
                </Link>
                <Link to="/editprofile">
                    <EditProfileButton>Edit Profile</EditProfileButton>
                </Link>
            </ButtonContainer>
            <Profile profile={profile} />
        </ProfileContainer>
    );
};

ProfileAndButtons.propTypes = {
    profile: PropTypes.object
};

const NoProfileContainer = styled.div`
    margin: auto;
`;

const MediumText = styled.div`
    font-size: 1rem;
    margin: 10px auto;
`;

const NoProfile = () => {
    return (
        <NoProfileContainer>
            <MediumText>You do not have a profile yet. Click add profile</MediumText>
            <Link to="/addprofile">
                <PrimaryButton>Add Profile</PrimaryButton>
            </Link>
        </NoProfileContainer>
    );
};

const MyProfile = ({ auth: { user, loading }, getProfile, profile: { profile } }) => {
    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <Container>
            {loading ? <Spinner /> : null}
            {!loading && user ? <Welcome name={user.name} /> : null}
            {profile ? <ProfileAndButtons profile={profile} /> : null}
            {!loading && !profile ? <NoProfile /> : null}
        </Container>
    );
};

MyProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

const mapDispatchToProps = {
    getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
