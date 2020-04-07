import React, { useEffect } from "react";
import { getOffice } from "../../Redux/actions/office";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OfficeMap from "./OfficeMap";
import Spinner from "../layout/Spinner";
import styled from "styled-components";
import BackImg from "../../img/aboutme.jpg";

const Background = styled.div`
    background-image: url(${BackImg});
    min-height: 400px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 680px) {
        display: none;
    }
`;

const Background2 = styled(Background)`
    min-height: 300px;
`;

const Background3 = styled(Background)`
    min-height: 600px;
`;

const ContactContainer = styled.div`
    max-width: 1000px;
    margin: auto;
    opacity: 0.9;
    @media (max-width: 680px) {
        margin-top 6rem;
        max-width: auto;
    }
`;

const ContactContainer2 = styled(ContactContainer)`
    margin-bottom: 1rem;
    @media (max-width: 680px) {
        margin-top: 0;
    }
`;

const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    color: #343a40;
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
`;

const Bio = () => {
    return (
        <BioContainer>
            <AboutTitleText>About</AboutTitleText>
            <BioText1>
                Al Kosela (Managing Broker), of Pro 1 Realty, based in Downers Grove, is a 17 year veteran of the real estate industry and
                has represented clients all over Chicago in over hundreds of real estate transactions. Al has built a solid foundation of
                clients in this community through his professionalism, attention to detail, and commitment to always put their client’s
                needs first.
            </BioText1>
            <BioText2>
                With a passion for realty in the Chicago area, Al and his team at Pro 1 are ready to help with your residential and
                commercial buying and selling needs. Our team carries the values of hard work, integrity, and outstanding client service
                into everything we do.
            </BioText2>
            <BioText3>
                Pro 1 is truly invested in the Midwest region. Our teams experience in Realty and familiarity with the Chicago region will
                be assets to both buyers and sellers.
            </BioText3>
        </BioContainer>
    );
};

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    border: 1px solid grey;
    margin: auto;
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
            </ContactContainer>
            <Background2 />
            <ContactContainer2>
                <Text address={address} phone={phone} city={city} state={state} zipcode={zipcode} />
                <MapContainer>
                    <OfficeMap />
                </MapContainer>
            </ContactContainer2>
            <Background3 />
        </>
    );
};

Office.propTypes = {
    getOffice: PropTypes.func.isRequired,
    office: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    office: state.office
});

export default connect(mapStateToProps, { getOffice })(Office);
