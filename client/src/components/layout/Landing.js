import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../../img/showcase.jpg";
import Row1Img from "../../img/row1.jpeg";
import Row2Img from "../../img/row2.jpg";
import PrimaryButton from "../universal/PrimaryButton";
import { connect } from "react-redux";
import { setNav } from "../../Redux/actions/navbar";
import PropTypes from "prop-types";

const LandingContainer = styled.div``;

const Background = styled.div`
    background-image: url(${BackgroundImage});
    min-height: 600px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 1230px) {
        min-height: auto;
        background-size: 100%;
        background-attachment: inherit;
    }
`;

const LandingInner = styled.div`
    z-index: 1;
    color: #fff;
    height: 600px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    @media (max-width: 1230px) {
        height: 300px;
    }
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 0.3rem;
    @media (max-width: 1230px) {
        font-size: 3rem;
    }
`;

const LeadText = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    @media (max-width: 1230px) {
        font-size: 1rem;
    }
`;

const LandingSection = () => {
    return (
        <LandingInner>
            <Title>Pro 1 Realty</Title>
            <LeadText>List your home or find a new one today</LeadText>
        </LandingInner>
    );
};

const RowContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1400px;
    margin: 6rem auto;
    justify-items: center;
    align-items: center;
    @media (max-width: 1230px) {
        grid-template-columns: 1fr;
        width: auto;
        margin: 0 auto;
    }
`;

const ImgContainer = styled.div`
    width: max-content;
    @media (max-width: 1230px) {
        margin: 1rem auto;
    }
`;

const Img = styled.img`
    max-height: 600px;
    max-width: 550px;
    @media (max-width: 1230px) {
        max-width: 100%;
        max-height: 300px;
    }
`;

const RowTextContainer = styled.div`
    width: fit-content;
    max-width: 550px;
    color: #17a2b8;
    @media (max-width: 1230px) {
        max-width: auto;
        margin: 1rem;
        height: auto;
    }
`;

const RowTextTitle = styled.div`
    font-size: 2.5rem;
    line-height: 1.2;
    @media (max-width: 1230px) {
        font-size: 2rem;
    }
`;

const RowTextDescription = styled.div`
    font-size: 1rem;
    margin: 1.5rem 0;
`;

const AgentsButton = styled(PrimaryButton)`
    padding: 1rem;
    min-width: 150px;
`;

const Row1 = ({ setNav }) => {
    const onClick = () => {
        setNav("/agents");
    };
    return (
        <RowContainer>
            <ImgContainer>
                <Img src={Row1Img} />
            </ImgContainer>
            <RowTextContainer>
                <RowTextTitle>Your home is one of your largest investments</RowTextTitle>
                <RowTextDescription>
                    When hiring a real estate agent to help you buy or sell a home, you want a REALTOR® who has the expertise and
                    professionalism to treat you and your home with the respect it deserves.
                </RowTextDescription>
                <Link to="/agents" onClick={onClick}>
                    <AgentsButton>Our Agents</AgentsButton>
                </Link>
            </RowTextContainer>
        </RowContainer>
    );
};

Row1.propTypes = {
    setNav: PropTypes.func.isRequired
};

const Row2 = ({ setNav }) => {
    const onClick = () => {
        setNav("/listings");
    };
    return (
        <RowContainer>
            <RowTextContainer>
                <RowTextTitle>Stay on track and in control</RowTextTitle>
                <RowTextDescription>
                    Since most of us buy or sell a home infrequently, you can count on Pro 1 Realty to provide excellent guidance and
                    education every step of the way - whether you’re buying your first home or selling your twentieth.
                </RowTextDescription>
                <Link to="/listings" onClick={onClick}>
                    <AgentsButton>Our Properties</AgentsButton>
                </Link>
            </RowTextContainer>
            <ImgContainer>
                <Img src={Row2Img} />
            </ImgContainer>
        </RowContainer>
    );
};

Row2.propTypes = {
    setNav: PropTypes.func.isRequired
};

const Landing = ({ setNav }) => {
    return (
        <LandingContainer>
            <Background>
                <LandingSection />
            </Background>
            <Row1 setNav={setNav} />
            <Row2 setNav={setNav} />
        </LandingContainer>
    );
};

Landing.propTypes = {
    setNav: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    setNav
};

export default connect(null, mapDispatchToProps)(Landing);
