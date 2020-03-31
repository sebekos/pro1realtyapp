import React, { useLayoutEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { getListing } from "../../Redux/actions/listing";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import PhotoViewer2 from "./PhotoViewer2";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import styled from "styled-components";

const ListingDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    box-sizing: border-box;
    margin: auto;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        text-align: center;
        width: auto;
    }
`;

const ListingPhotosContainer = styled.div`
    width: 100%;
`;

const TitleContainer = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        text-align: center;
        width: auto;
    }
`;

const AddressLine1 = styled.span`
    font-size: 1.5rem;
`;

const AddressLine2 = styled.span`
    font-size: 1rem;
`;

const AddressLine = styled.div`
    font-color: blue;
`;

const PriceLine = styled.div`
    position: relative;
`;

const PriceLineText = styled.div`
    width: fit-content;
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1.5rem;
    @media (max-width: 680px) {
        position: relative;
        margin: auto;
    }
`;

const Title = ({ listing: { address, city, state, price } }) => {
    const confAddress = !address ? "Confidential" : address;
    const confPrice = price ? <NumberFormat value={price} displayType={"text"} thousandSeparator={true} prefix={"$"} /> : "";
    const confCity = city ? `${city}, ${state}` : `${state}`;
    return (
        <TitleContainer>
            <AddressLine>
                <AddressLine1>{confAddress} </AddressLine1>
                <AddressLine2> {confCity}</AddressLine2>
            </AddressLine>
            <PriceLine>
                <PriceLineText>{confPrice}</PriceLineText>
            </PriceLine>
        </TitleContainer>
    );
};

Title.propTypes = {
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    price: PropTypes.number
};

const ListingPhotos = ({ photos }) => {
    return (
        <ListingPhotosContainer>
            <PhotoViewer2 photos={photos} />
        </ListingPhotosContainer>
    );
};

ListingPhotos.propTypes = {
    photos: PropTypes.array.isRequired
};

const DescriptionText = styled.div`
    font-size: 1rem;
    box-sizing: border-box;
    padding: 5px;
    margin-top: 5px;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const Description = ({ description }) => {
    return <DescriptionText>{description}</DescriptionText>;
};

Description.propTypes = {
    description: PropTypes.string
};

const DetailsContactContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 5px;
    margin-top: 5px;
    box-sizing: border-box;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        text-align: center;
        width: auto;
    }
`;

const DetailContactColumnTitle = styled.div`
    font-size: 1.2rem;
    text-decoration: underline;
`;

const DetailsContainer = styled.div`
    color: grey;
`;

const DetailTextContainer = styled.div`
    width: 100%;
`;

const LeadText = styled.span`
    color: black;
`;

const LagText = styled.span`
    color: grey;
`;

const Details = ({ listing }) => {
    const listingProps = {
        status: "Status",
        listdate: "List Date",
        type: "Type",
        bedroom: "Bedrooms",
        bathroom: "Bathrooms",
        squarefeet: "Squarefeet"
    };
    const detailsHtml = Object.keys(listingProps).map((memo, index) => {
        return (
            <DetailTextContainer key={`dtc-${index}`}>
                <LeadText>{listingProps[memo]}: </LeadText>
                {memo === "listdate" ? (
                    <LagText>
                        <Moment parse="YYYY-MM-DDTHH:mm:ss.SSSZ" format="LL">
                            {listing[memo]}
                        </Moment>
                    </LagText>
                ) : (
                    <LagText> {listing[memo]}</LagText>
                )}
            </DetailTextContainer>
        );
    });
    return (
        <DetailsContainer>
            <DetailContactColumnTitle>Details</DetailContactColumnTitle>
            {detailsHtml}
        </DetailsContainer>
    );
};

Details.propTypes = {
    listing: PropTypes.object
};

const ContactContainer = styled.div`
    color: grey;
`;

const Contact = ({ listing: { agentinfo } }) => {
    const listingProps = {
        name: "Agent",
        phone: "Phone",
        email: "Email"
    };
    const detailsHtml = Object.keys(listingProps).map((memo, index) => {
        return (
            <DetailTextContainer key={`dtc-${index}`}>
                <LeadText>{listingProps[memo]}: </LeadText>
                {memo === "phone" ? (
                    <LagText>
                        <NumberFormat displayType="text" format="(###) ###-####" value={agentinfo[memo]} />
                    </LagText>
                ) : (
                    <LagText> {agentinfo[memo]}</LagText>
                )}
            </DetailTextContainer>
        );
    });
    return (
        <ContactContainer>
            <DetailContactColumnTitle>Contact</DetailContactColumnTitle>
            {detailsHtml}
        </ContactContainer>
    );
};

Details.propTypes = {
    agentinfo: PropTypes.object
};

const DetailsContact = ({ listing }) => {
    return (
        <DetailsContactContainer>
            <Details listing={listing} />
            <Contact listing={listing} />
        </DetailsContactContainer>
    );
};

const ListingDetails = ({ getListing, match, listing: { loading, listing } }) => {
    useLayoutEffect(() => {
        getListing(match.params.id);
    }, [getListing]);

    return (
        <>
            {loading ? <Spinner /> : null}
            {loading || !listing ? null : (
                <ListingDetailsContainer>
                    <Title listing={listing} />
                    <ListingPhotos photos={listing.photos} />
                    <Description description={listing.description} />
                    <DetailsContact listing={listing} />
                </ListingDetailsContainer>
            )}
        </>
    );
};

ListingDetails.propTypes = {
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

const mapDispatchToProps = {
    getListing
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetails);
