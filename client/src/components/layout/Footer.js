import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    background-color: #107484;
    color: white;
    text-align: center;
`;

const FootTextTitle = styled.div`
    font-size: 1.5rem;
    padding: 2.5rem 0 1rem;
`;

const FootInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: fit-content;
    margin: 1rem auto;
    font-weight: 100;
`;

const FootInfoText = styled.div`
    font-size: 1rem;
    font-weight: 100;
    text-decoration: underline;
`;

const FootInfoNote = styled.div`
    font-size: 1rem;
    margin: 1rem;
    font-weight: 100;
`;

const FootCopyRight = styled.div`
    font-size: 1rem;
    font-weight: 100;
    padding: 1rem 0 1rem;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FootTextTitle>Pro 1 Realty Inc.</FootTextTitle>
            <FootInfoContainer>
                <FootInfoText>
                    <a href="tel:1-630-395-9690">(630) 395-9690</a>
                </FootInfoText>
                <FootInfoText>
                    <a href="mailto:pro1realtyinc@gmail.com">pro1realtyinc@gmail.com</a>
                </FootInfoText>
            </FootInfoContainer>
            <FootInfoNote>
                Pro 1 realty is a Real Estate brokerage located at 6900 Main St. Suite #153, Downers Grove, IL. Pro 1 Realty abides by all
                equal opportunity housing laws.
            </FootInfoNote>
            <FootCopyRight>&copy; {new Date().getFullYear()}. Pro 1 Realty Inc</FootCopyRight>
        </FooterContainer>
    );
};

export default Footer;
