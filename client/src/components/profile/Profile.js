import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DefaultAvatar from "../../img/defaultavatar.png";
import GreenButton from "../universal/GreenButton";
import { setNav } from "../../Redux/actions/navbar";

const ProfileItemContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 200px 400px;
    box-sizing: border-box;
    margin: 5px 5px;
    width: 600px;
    height: 195px;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
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

const ListingsButton = styled(GreenButton)``;

const Button = ({ agentid, setNav }) => {
    const onClick = () => {
        setNav("/listings");
    };
    return (
        <ButtonContainer>
            <Link to={`/listings/${agentid}`} onClick={onClick}>
                <ListingsButton>View Listings</ListingsButton>
            </Link>
        </ButtonContainer>
    );
};

Button.propTypes = {
    agentid: PropTypes.string,
    setNav: PropTypes.func.isRequired
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
        border-right: none;
    }
`;

const Image = ({ photo }) => {
    return (
        <ImageContainer>
            <ImageItem src={photo ? photo : DefaultAvatar} />
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

const Text = ({ name, position, location, phone, email, agentid, setNav }) => {
    return (
        <TextContainer>
            <NameText>{name}</NameText>
            <PositionText>{position}</PositionText>
            <LocationText>{location}</LocationText>
            <PhoneText>
                <a href={`tel:1${phone}`}>
                    <NumberFormat displayType="text" format="(###) ###-####" value={phone} />
                </a>
            </PhoneText>
            <EmailText>{email}</EmailText>
            <Button agentid={agentid} setNav={setNav} />
        </TextContainer>
    );
};

Text.propTypes = {
    name: PropTypes.string,
    position: PropTypes.string,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    agentid: PropTypes.string,
    setNav: PropTypes.func.isRequired
};

const Profile = ({ profile: { name, position, location, phone, email, photo, user }, setNav }) => (
    <ProfileItemContainer>
        <Image photo={photo} />
        <Text name={name} position={position} location={location} phone={phone} email={email} agentid={user} setNav={setNav} />
    </ProfileItemContainer>
);

Profile.propTypes = {
    name: PropTypes.string,
    position: PropTypes.string,
    location: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
    user: PropTypes.string,
    setNav: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    setNav
};

export default connect(null, mapDispatchToProps)(Profile);
