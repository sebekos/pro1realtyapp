import React, { useEffect, Fragment } from "react";
import { getOffice } from "../../Redux/actions/office";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OfficeMap from "./OfficeMap";
import Spinner from "../layout/Spinner";
import styled from "styled-components";
import BackImg from "../../img/aboutme.jpg";

const Background = styled.div`
    background: url(${BackImg}) no-repeat center center fixed;
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
`;

const ContactContainer = styled.div`
    width: 800px;
    margin: auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    background-color: white;
    opacity: 0.9;
    @media (max-width: 680px) {
        width: auto;
    }
`;

const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    padding: 10px;
    color: #343a40;
    border-bottom: 1px solid grey;
    @media (max-width: 680px) {
        width: auto;
    }
`;

const AboutTitleText = styled.div`
    font-size: 2rem;
    margin-left: 1rem;
`;

const BioText1 = styled.div`
    font-size: 1rem;
    margin-bottom: 20px;
`;

const BioText2 = styled.div`
    font-size: 1rem;
    margin-bottom: 20px;
`;

const BioText3 = styled.div`
    font-size: 1rem;
    margin-bottom: 20px;
`;

const Bio = () => {
    return (
        <BioContainer>
            <AboutTitleText>About</AboutTitleText>
            <BioText1>
                Al Kosela has been an active member of his real community for 15 years now, and is so excited to be turning that community
                focus toward real estate.
            </BioText1>
            <BioText2>
                With a passion for service in the Chicago area, Pro 1 Realty is ready to help with your home buying and selling needs. As a
                proud member of the Pro 1 family, Al carries the values of hard work, integrity, and outstanding client service into
                everything he does.
            </BioText2>
            <BioText3>
                When Al isn’t making home ownership dreams come true for his/her clients, he enjoys spending time cycling and with his
                friends. Al lives in Downers Grove with his family.
            </BioText3>
        </BioContainer>
    );
};

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    padding: 10px;
    margin: auto;
`;

const TitleText = styled.div`
    font-size: 2rem;
    margin-left: 1rem;
`;

const DescriptionText = styled.div`
    font-size: 1rem;
`;

const Text = ({ address, zipcode, phone, state, city }) => {
    return (
        <TextContainer>
            <TitleText>Main Office</TitleText>
            <DescriptionText>{phone}</DescriptionText>
            <DescriptionText>{address}</DescriptionText>
            <DescriptionText>
                {city}, {state} {zipcode}
            </DescriptionText>
        </TextContainer>
    );
};

Text.propTypes = {
    address: PropTypes.string,
    phone: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string
};

const MapContainer = styled.div`
    width: fit-content;
    margin: 5px auto;
    border: 1px solid grey;
    @media (max-width: 680px) {
        display: none;
    }
`;

const Office = ({
    getOffice,
    office: {
        office: { address, phone, city, state, zipcode },
        loading
    }
}) => {
    useEffect(() => {
        getOffice();
    }, [getOffice]);

    return loading ? (
        <Spinner />
    ) : (
        <>
            <Background />
            <ContactContainer>
                <Bio />
                <Text address={address} phone={phone} city={city} state={state} zipcode={zipcode} />
                <MapContainer>
                    <OfficeMap />
                </MapContainer>
            </ContactContainer>
        </>
    );
};

Office.propTypes = {
    getOffice: PropTypes.func.isRequired,
    office: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    office: state.office
});

export default connect(mapStateToProps, { getOffice })(Office);
