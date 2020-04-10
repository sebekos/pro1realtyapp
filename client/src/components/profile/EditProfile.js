import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getProfile, addProfile, deleteProfile } from "../../Redux/actions/profile";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import LightButton from "../universal/LightButton";
import DangerButton from "../universal/DangerButton";

const Container = styled.div`
    max-width: 1300px;
    margin: auto;
    overflow: hidden;
    padding: 0 2rem;
    margin: 3rem auto;
`;

const TextPrimary = styled.div`
    color: #17a2b8;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
    & > button {
        margin-right: 5px;
    }
    & > a {
        margin-right: 5px;
    }
`;

const Buttons = ({ onSubmit, onDelete }) => {
    return (
        <ButtonContainer>
            <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
            <Link to="/myprofile">
                <LightButton>Go Back</LightButton>
            </Link>
            <DangerButton onClick={onDelete}>Delete</DangerButton>
        </ButtonContainer>
    );
};

Buttons.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const Image = styled.img`
    margin-bottom: 1rem;
`;

const Avatar = ({ photo }) => {
    return (
        <AvatarContainer>
            <Image src={photo} alt="" />
            <Link to="/editprofile/avatar">
                <LightButton>Add/Edit Avatar</LightButton>
            </Link>
        </AvatarContainer>
    );
};

const Form = styled(GenForm)`
    margin-top: 1rem;
`;

const EditProfile = ({ getProfile, addProfile, deleteProfile, profile: { profile, loading }, history }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        location: "",
        phone: "",
        email: "",
        photo: ""
    });

    useEffect(() => {
        getProfile();
        setFormData({
            id: loading || !profile._id ? "" : profile._id,
            name: loading || !profile.name ? "" : profile.name,
            location: loading || !profile.location ? "" : profile.location,
            phone: loading || !profile.phone ? "" : profile.phone,
            email: loading || !profile.email ? "" : profile.email,
            photo: loading || !profile.photo ? "" : profile.photo
        });
    }, [loading, getProfile]);

    const { id, name, location, phone, email, photo } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addProfile(formData, history);
    };

    const onDelete = (e) => {
        e.preventDefault();
        if (!window.confirm("This will delete your profile and listings. Press OK to continue")) {
            return;
        }
        deleteProfile();
    };

    const onPhone = (e) => {
        formData.phone = e.value;
        setFormData({ ...formData, [phone]: "" });
    };

    return (
        <Container>
            <TextPrimary>Profile Information</TextPrimary>
            <Avatar photo={photo} />
            <Form onSubmit={onSubmit}>
                <GenInput type="text" placeholder="Visible Name" name="name" value={name} onChange={onChange} />
                <GenInput type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                <NumberFormat
                    className="number-format"
                    format="(###) ###-####"
                    mask=""
                    name="phone"
                    placeholder="Phone Number"
                    onValueChange={(e) => onPhone(e)}
                    value={phone}
                />
                <GenInput type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
            </Form>
            <Buttons onDelete={onDelete} onSubmit={onSubmit} />
        </Container>
    );
};

EditProfile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    addProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

const mapDispatchToProps = {
    getProfile,
    addProfile,
    deleteProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
