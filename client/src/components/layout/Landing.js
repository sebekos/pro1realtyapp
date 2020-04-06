import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../../img/showcase.jpg";
import PrimaryButton from "../universal/PrimaryButton";
import LightButton from "../universal/LightButton";

const LandingContainer = styled.section`
    position: relative;
    background: url(${BackgroundImage}) no-repeat center center/cover;
    height: 100vh;
    margin-bottom: -12rem;
`;

const DarkOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const LandingInner = styled.div`
    color: #fff;
    height: 100%;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 0.3rem;
`;

const LeadText = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div``;

const FindButton = styled(PrimaryButton)`
    margin-right: 0.5rem;
`;

const ViewButton = styled(LightButton)`
    margin-right: 0.5rem;
`;

const Landing = () => {
    return (
        <LandingContainer>
            <DarkOverlay>
                <LandingInner>
                    <Title>Pro 1 Realty</Title>
                    <LeadText>List your home or find a new one today</LeadText>
                    <ButtonContainer>
                        <Link to="/agents">
                            <FindButton>Find An Agent</FindButton>
                        </Link>
                        <Link to="/listings">
                            <ViewButton>View Our Listings</ViewButton>
                        </Link>
                    </ButtonContainer>
                </LandingInner>
            </DarkOverlay>
        </LandingContainer>
    );
};

export default Landing;
