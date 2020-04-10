import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addProfile } from "../../Redux/actions/profile";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";
import LightButton from "../universal/LightButton";

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

const FormText = styled.small`
    font-size: 0.7rem;
    display: block;
    margin-top: -1rem;
    margin-bottom: 0.5rem;
    color: #888;
`;

const ButtonContainer = styled.div`
    & > button {
        margin-right: 5px;
    }
`;

const AddProfile = ({ addProfile, history }) => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        phone: "",
        email: ""
    });

    const { name, location, phone, email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addProfile(formData, history);
    };

    const onPhone = (e) => {
        formData.phone = e.value;
        setFormData({ ...formData, [phone]: "" });
    };

    return (
        <Container>
            <TextPrimary>Profile Information</TextPrimary>
            <GenForm className="form" onSubmit={onSubmit}>
                <GenInput type="text" placeholder="Visible Name" name="name" value={name} onChange={onChange} />
                <GenInput type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                <FormText className="form-text">* Chicago Land Area, Great Lakes, etc...</FormText>
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
            </GenForm>
            <ButtonContainer>
                <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
                <Link to="/myprofile">
                    <LightButton>Go Back</LightButton>
                </Link>
            </ButtonContainer>
        </Container>
    );
};

AddProfile.propTypes = {
    addProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    addProfile
};

export default connect(null, mapDispatchToProps)(withRouter(AddProfile));
