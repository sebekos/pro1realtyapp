import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import GreenButton from "../universal/GreenButton";
import DangerButton from "../universal/DangerButton";

const SummaryContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 275px 337px;
    box-sizing: border-box;
    margin: 5px 5px;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
    @media (max-width: 680px) {
        grid-template-columns: 1fr;
        max-width: 315px;
    }
`;

const ImgContainer = styled.div`
    max-height: 200px;
    max-width: 275px;
    min-height: 200px;
    min-width: 275px;
    overflow: hidden;
    position: relative;
    border-right: 1px solid grey;
    background-color: black;
    color: white;
    text-align: center;
    vertical-align: middle;
    @media (max-width: 680px) {
        margin: auto;
        min-width: 315px;
        border-right: none;
    }
`;

const Img = styled.img`
    max-width: 300px;
    @media (max-width: 680px) {
        max-width: 315px;
    }
`;

const PhotoCountContainer = styled.div`
    height: 25px;
    width: 50px;
    background-color: black;
    opacity: 0.5;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
    color: white;
`;

const Image = ({ src, count }) => {
    return (
        <ImgContainer>
            <Img src={src} alt="No Photos"></Img>
            <PhotoCountContainer>
                <i className="fas fa-camera">{" " + count}</i>
            </PhotoCountContainer>
        </ImgContainer>
    );
};

Image.propTypes = {
    src: PropTypes.string,
    count: PropTypes.number
};

const InfoContainer = styled.div`
    padding: 5px 10px;
`;

const AddressPriceContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 100%;
    box-sizing: border-box;
`;

const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddressFirstLine = styled.div`
    font-size: 1.3rem;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #17a2b8;
`;

const AddressFirstLineLink = styled.a`
    text-decoration: none;
    white-space: nowrap;
    color: #17a2b8;
`;

const AddressSecondLine = styled.div`
    font-size: 0.8rem;
`;

const Price = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    justify-self: end;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const AddressPrice = ({ address, city, state, price, listingid }) => {
    const confAddress = !address ? "Confidential" : address;
    const confPrice = price ? (
        <NumberFormat mask="Call" value={price} displayType={"text"} thousandSeparator={true} prefix={"$"} />
    ) : (
        "Call"
    );
    const confCity = city ? `${city}, ${state}` : `${state}`;
    return (
        <AddressPriceContainer>
            <AddressContainer>
                <AddressFirstLine>
                    <AddressFirstLineLink href={`/listing/${listingid}`}>{confAddress}</AddressFirstLineLink>
                </AddressFirstLine>
                <AddressSecondLine>{confCity}</AddressSecondLine>
            </AddressContainer>
            <Price>{confPrice}</Price>
        </AddressPriceContainer>
    );
};

AddressPrice.propTypes = {
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    price: PropTypes.number,
    listingid: PropTypes.string
};

const StatusDateLineContainer = styled.div`
    width: 100%;
`;

const StatusLine = styled.span`
    color: red;
    font-size: 1rem;
`;

const MiddleChar = styled.span`
    font-size: 1.2rem;
    color: grey;
`;

const TypeLine = styled.span`
    font-size: 1rem;
`;

const DateLine = styled.span`
    font-size: 1rem;
`;

const StatusDateLine = ({ status, type, listdate }) => {
    const confType = type.includes("Conf") ? "Commercial" : type;
    return (
        <StatusDateLineContainer>
            <StatusLine>{status}</StatusLine>
            <MiddleChar> - </MiddleChar>
            <TypeLine>{confType}</TypeLine>
            <MiddleChar> - </MiddleChar>
            <DateLine>
                <Moment parse="YYYY-MM-DDTHH:mm:ss.SSSZ" format="LL">
                    {listdate}
                </Moment>
            </DateLine>
        </StatusDateLineContainer>
    );
};

StatusDateLine.propTypes = {
    status: PropTypes.string,
    type: PropTypes.string,
    listdate: PropTypes.string
};

const BlockLineContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 10px 0px;
`;

const BlockTextContainer = styled.div`
    min-height: 40px;
    max-height: 40px;
    min-width: 70px;
    text-align: center;
    border-right: 1px solid grey;
    padding: 0 10px;
    font-size: 0.8rem;
    &:last-child {
        border-right: none;
    }
`;

const BlockText = ({ bedroom, bathroom, squarefeet }) => {
    return (
        <BlockLineContainer>
            {bedroom ? (
                <BlockTextContainer>
                    <div>{bedroom}</div>
                    <div>Bed</div>
                </BlockTextContainer>
            ) : null}
            {bathroom ? (
                <BlockTextContainer>
                    <div>{bathroom}</div>
                    <div>Bath</div>
                </BlockTextContainer>
            ) : null}
            {squarefeet ? (
                <BlockTextContainer>
                    <div>
                        <NumberFormat value={squarefeet} displayType={"text"} thousandSeparator={true} />
                    </div>
                    <div>Sqft</div>
                </BlockTextContainer>
            ) : null}
        </BlockLineContainer>
    );
};

BlockText.propTypes = {
    bedroom: PropTypes.number,
    bathroom: PropTypes.number,
    squarefeet: PropTypes.number
};

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 2px 2px 0;
    @media (max-width: 680px) {
        position: relative;
        margin: auto;
        width: fit-content;
    }
`;

const DetailsButton = styled(GreenButton)``;

const EditButton = styled(DangerButton)`
    margin-right: 5px;
`;

const Buttons = ({ listingId, user, agentid }) => {
    return (
        <ButtonContainer>
            {user && user._id === agentid ? (
                <Link to={`/editlisting/${listingId}`}>
                    <EditButton href={`/edit/${listingId}`}>Edit</EditButton>
                </Link>
            ) : null}
            <Link to={`/listing/${listingId}`}>
                <DetailsButton>More Details</DetailsButton>
            </Link>
        </ButtonContainer>
    );
};

Buttons.propTypes = {
    listingId: PropTypes.string,
    user: PropTypes.object,
    agentid: PropTypes.string
};

const ListingItem = ({
    auth: { user },
    listing: { agentid, photos, listdate, status, type, address, city, state, price, bedroom, bathroom, squarefeet, _id }
}) => (
    <SummaryContainer>
        <Image src={photos[0]} count={photos.length} />
        <InfoContainer>
            <AddressPrice address={address} city={city} state={state} price={price} listingid={_id} />
            <StatusDateLine status={status} type={type} listdate={listdate} />
            <BlockText bedroom={bedroom} bathroom={bathroom} squarefeet={squarefeet} />
            <Buttons listingId={_id} user={user} agentid={agentid} />
        </InfoContainer>
    </SummaryContainer>
);

ListingItem.propTypes = {
    listing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    listingId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(ListingItem);
