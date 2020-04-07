import React, { useState } from "react";
import { connect } from "react-redux";
import { pwresetsave } from "../../Redux/actions/auth";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";

const Container = styled.div`
    max-width: 400px;
    margin: auto;
    box-sizing: border-box;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const FormContainer = styled(GenForm)`
    max-width: 400px;
    padding: 0 20px 20px;
`;

const TextContainer = styled.div`
    padding: 20px 20px;
`;

const LeadText = styled.p`
    font-size: 1rem;
`;

const Pwreset = ({ pwresetsave, auth: { loading }, match, history }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: ""
    });

    const { email, password, password2 } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            pwresetsave(email, password, match.params.hash, history);
        }
    };

    return (
        <Container>
            {loading ? <Spinner /> : null}
            <TextContainer>
                <LeadText>
                    <i className="fas fa-user"></i> Reset account password
                </LeadText>
            </TextContainer>
            <FormContainer onSubmit={onSubmitHandler}>
                <GenInput type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} required />
                <PrimaryButton type="submit" onClick={onSubmitHandler}>
                    Reset
                </PrimaryButton>
            </FormContainer>
        </Container>
    );
};

Pwreset.propTypes = {
    pwresetsave: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    pwresetsave
};

export default connect(mapStateToProps, mapDispatchToProps)(Pwreset);
