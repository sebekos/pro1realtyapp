import React, { useEffect, Fragment } from "react";
import { getOffice } from "../../Redux/actions/office";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OfficeMap from "./OfficeMap";
import Spinner from "../layout/Spinner";
import styled from "styled-components";

const ContactContainer = styled.div`
    width: 600px;
    margin: auto;
    background-color: #f2f5f2;
    border: 1px solid grey;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const TitleText = styled.div`
    font-size: 2rem;
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
    margin: 0 auto 5px;
    border: 1px solid grey;
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
        <ContactContainer>
            <Text address={address} phone={phone} city={city} state={state} zipcode={zipcode} />
            <MapContainer>
                <OfficeMap />
            </MapContainer>
        </ContactContainer>
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
