import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import PropTypes from "prop-types";
import ButtonLink from "../universal/ButtonLink";
import { Link } from "react-router-dom";

const ProfileItemContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 200px 400px;
    box-sizing: border-box;
    border-top: 1px solid grey;
    margin: 5px 5px;
    width: 600px;
    height: 200px;
    -webkit-box-shadow: 0 2px 2px 1px #000000;
    -moz-box-shadow: 0 2px 2px 1px #000000;
    box-shadow: 0 2px 2px 1px #000000;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        height: auto;
        width: fit-content;
    }
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 2px 2px 0;
    @media (max-width: 680px) {
        position: relative;
        margin: auto;
        width: fit-content;
    }
`;

const ListingsButton = styled(ButtonLink)`
    background-color: #17a2b8;
    & > a {
        color: white;
    }
`;

const Button = ({ agentid }) => {
    return (
        <ButtonContainer>
            <ListingsButton>
                <Link to={`/listings/${agentid}`}>View Listings</Link>
            </ListingsButton>
        </ButtonContainer>
    );
};

Button.propTypes = {
    agentid: PropTypes.string
};

const ImageContainer = styled.div`
    max-height: 200px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: black;
`;

const ImageItem = styled.img`
    border-right: 1px solid grey;
    width: 200px;
    margin: auto;
    @media (max-width: 680px) {
        width: fit-content;
    }
`;

const Image = ({ photo }) => {
    return (
        <ImageContainer>
            <ImageItem src={photo ? photo : "https://pro1realty.s3.us-east-2.amazonaws.com/avatars/1565831781133.png"} />
        </ImageContainer>
    );
};

Image.propTypes = {
    photo: PropTypes.string
};

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2f5f2;
    padding: 10px;
`;

const NameText = styled.div`
    color: grey;
    font-size: 1.5rem;
`;

const PositionText = styled.div`
    color: black;
`;

const LocationText = styled.div`
    color: black;
`;

const PhoneText = styled.div`
    color: black;
`;

const EmailText = styled.div`
    color: black;
`;

const Text = ({ name, position, location, phone, email, agentid }) => {
    return (
        <TextContainer>
            <NameText>{name}</NameText>
            <PositionText>{position}</PositionText>
            <LocationText>{location}</LocationText>
            <PhoneText>
                <NumberFormat displayType="text" format="(###) ###-####" value={phone} />
            </PhoneText>
            <EmailText>{email}</EmailText>
            <Button agentid={agentid} />
        </TextContainer>
    );
};

Text.propTypes = {
    name: PropTypes.string,
    position: PropTypes.string,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    agentid: PropTypes.string
};

const Profile = ({ profile: { name, position, location, phone, email, photo, user } }) => (
    <ProfileItemContainer>
        <Image photo={photo} />
        <Text name={name} position={position} location={location} phone={phone} email={email} agentid={user} />
    </ProfileItemContainer>
);

Profile.propTypes = {
    name: PropTypes.string,
    position: PropTypes.string,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
    user: PropTypes.string
};

export default Profile;
