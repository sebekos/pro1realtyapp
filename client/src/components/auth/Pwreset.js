import React, { useState } from "react";
import { connect } from "react-redux";
import { pwreset } from "../../Redux/actions/auth";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import PrimaryButton from "../universal/PrimaryButton";

const LoginContainer = styled.div`
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

const ResetTextContainer = styled.div`
    padding: 20px 20px;
`;

const ResetButton = styled(PrimaryButton)`
    margin-right: 5px;
`;

const Pwreset = ({ pwreset }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(0);

    const onChangeHandler = e => setEmail(e.target.value);

    const onSubmitHandler = async e => {
        e.preventDefault();
        setLoading(1);
        await pwreset(email);
        setLoading(0);
    };

    return (
        <LoginContainer>
            <ResetTextContainer>
                <p className="lead">
                    <i className="fas fa-user"></i> Reset account password
                </p>
            </ResetTextContainer>
            <FormContainer>
                <GenInput
                    type="email"
                    placeholder="Account Email Address"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    required
                ></GenInput>
                <ResetButton type="submit" onClick={onSubmitHandler}>
                    Reset
                </ResetButton>
            </FormContainer>
            {loading ? <Spinner /> : null}
        </LoginContainer>
    );
};

Pwreset.propTypes = {
    pwreset: PropTypes.func.isRequired
};

export default connect(null, { pwreset })(Pwreset);
