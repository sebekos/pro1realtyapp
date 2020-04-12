import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addListing, getListing, deleteListing } from "../../Redux/actions/listing";
import DatePicker from "react-datepicker";
import States from "../layout/States";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import TextArea from "../universal/TextArea";
import DropDown from "../universal/DropDown";
import GreenButton from "../universal/GreenButton";
import PrimaryButton from "../universal/PrimaryButton";
import DangerButton from "../universal/DangerButton";
import DarkButton from "../universal/DarkButton";
import LightButton from "../universal/LightButton";

import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
    max-width: 1300px;
    margin: auto;
    overflow: hidden;
    padding: 0 2rem;
    margin: 3rem auto;
`;

const Form = styled(GenForm)`
    margin: 1rem auto;
`;

const TitleText = styled.h1`
    font-size: 2rem;
    color: #17a2b8;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const AddPhotoButton = styled(PrimaryButton)`
    margin-right: 5px;
`;

const DeletePhotoButton = styled(DangerButton)`
    margin-right: 5px;
`;

const SortPhotoButton = styled(DarkButton)``;

const TopButtons = ({ id }) => {
    return (
        <ButtonContainer>
            <Link to={`/editlisting/addphotos/${id}`}>
                <AddPhotoButton>Add Photos</AddPhotoButton>
            </Link>
            <Link to={`/editlisting/delete/${id}`}>
                <DeletePhotoButton>Delete Photos</DeletePhotoButton>
            </Link>
            <Link to={`/editlisting/sort/${id}`}>
                <SortPhotoButton>Sort Photos</SortPhotoButton>
            </Link>
        </ButtonContainer>
    );
};

TopButtons.propTypes = {
    id: PropTypes.string
};

const BottomButtonsContainer = styled.div``;

const BackButton = styled(LightButton)`
    margin-right: 5px;
`;

const SubmitButton = styled(GreenButton)`
    margin-right: 5px;
`;

const BottomButtons = ({ onDelete, onSubmit }) => {
    return (
        <BottomButtonsContainer>
            <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
            <Link to="/mylistings">
                <BackButton>Go Back</BackButton>
            </Link>
            <DangerButton onClick={onDelete}>Delete</DangerButton>
        </BottomButtonsContainer>
    );
};

BottomButtons.propTypes = {
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func
};

const FormInputsContainer = styled.div`
    margin: auto;
`;

const FormInputs = ({
    listdate,
    onDate,
    status,
    onChange,
    type,
    address,
    city,
    zipcode,
    state,
    price,
    soldprice,
    bedroom,
    bathroom,
    squarefeet,
    description
}) => {
    return (
        <FormInputsContainer>
            <DatePicker placeholderText="* Select listed date" selected={listdate} onChange={onDate} maxDate={new Date()} />
            <DropDown name="status" value={status} onChange={onChange}>
                <option>Active</option>
                <option>Under Contract</option>
                <option>Pending</option>
                <option>Closed</option>
            </DropDown>
            <DropDown name="type" value={type} onChange={onChange}>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Confidential - Residential</option>
                <option>Confidential - Commercial</option>
            </DropDown>
            <GenInput
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={onChange}
                disabled={type.includes("Conf") ? true : false}
            />
            <GenInput
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={onChange}
                disabled={type.includes("Conf") ? true : false}
            />
            <States update={onChange} chosen={state} />
            <GenInput
                type="text"
                placeholder="Zipcode"
                name="zipcode"
                value={zipcode}
                onChange={onChange}
                disabled={type.includes("Conf") ? true : false}
            />
            <GenInput type="number" placeholder="Price" name="price" value={price} onChange={onChange} />
            {status === "Closed" ? (
                <GenInput type="number" placeholder="Sold Price" name="soldprice" value={soldprice} onChange={onChange} />
            ) : null}
            <GenInput type="number" placeholder="Bedroom" name="bedroom" value={bedroom} onChange={onChange} />
            <GenInput type="number" placeholder="Bathroom" name="bathroom" value={bathroom} onChange={onChange} />
            <GenInput type="number" placeholder="Squarefeet" name="squarefeet" value={squarefeet} onChange={onChange} />
            <TextArea rows="4" type="text" placeholder="Description" name="description" value={description} onChange={onChange} />
        </FormInputsContainer>
    );
};

FormInputs.propTypes = {
    onDate: PropTypes.func,
    onChange: PropTypes.func
};

const EditListing = ({ addListing, getListing, history, match, listing: { loading, listing }, deleteListing }) => {
    const [listdate, setListDate] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        status: "",
        type: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        price: "",
        soldprice: "",
        bedroom: "",
        bathroom: "",
        squarefeet: "",
        description: "",
        ldate: ""
    });

    useLayoutEffect(() => {
        getListing(match.params.id);
    }, []);

    useLayoutEffect(() => {
        if (listing) {
            setFormData({
                id: loading || !listing._id ? "" : listing._id,
                status: loading || !listing.status ? "" : listing.status,
                type: loading || !listing.type ? "" : listing.type,
                address: loading || !listing.address ? "" : listing.address,
                city: loading || !listing.city ? "" : listing.city,
                state: loading || !listing.state ? "" : listing.state,
                zipcode: loading || !listing.zipcode ? "" : listing.zipcode,
                price: loading || !listing.price ? "" : listing.price,
                soldprice: loading || !listing.soldprice ? "" : listing.soldprice,
                bedroom: loading || !listing.bedroom ? 0 : listing.bedroom,
                bathroom: loading || !listing.bathroom ? 0 : listing.bathroom,
                squarefeet: loading || !listing.squarefeet ? "" : listing.squarefeet,
                description: loading || !listing.description ? "" : listing.description,
                ldate: loading || !listing.listdate ? "" : setUpDate(listing.listdate)
            });
        }
    }, [listing]);

    const setUpDate = (data) => {
        var date = new Date(data);
        setListDate(new Date(date));
    };

    const { id, status, type, address, city, state, zipcode, price, soldprice, bedroom, bathroom, squarefeet, description } = formData;

    const onChange = (e) => {
        if (e.target.name === "type" && e.target.value.includes("Conf")) {
            setFormData({
                ...formData,
                city: "",
                zipcode: "",
                type: e.target.value
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const listingData = {
            ...formData,
            listdate: listdate
        };
        await addListing(listingData, history, true);
    };

    const onDelete = (e) => {
        e.preventDefault();
        if (!window.confirm("This will delete this listing. Press OK to continue")) {
            return;
        }
        deleteListing(listing._id, history);
    };

    const onDate = (date) => {
        setListDate(date);
    };

    return (
        <Container>
            <TitleText>Listing Information</TitleText>
            <TopButtons id={id} />
            <Form onSubmit={onSubmit}>
                <FormInputs
                    listdate={listdate}
                    onDate={onDate}
                    status={status}
                    onChange={onChange}
                    type={type}
                    address={address}
                    city={city}
                    zipcode={zipcode}
                    state={state}
                    price={price}
                    soldprice={soldprice}
                    bedroom={bedroom}
                    bathroom={bathroom}
                    squarefeet={squarefeet}
                    description={description}
                />
            </Form>
            <BottomButtons onDelete={onDelete} onSubmit={onSubmit} />
        </Container>
    );
};

EditListing.propTypes = {
    addListing: PropTypes.func.isRequired,
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired,
    deleteListing: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    listing: state.listing
});

const mapDispatchToProps = {
    addListing,
    getListing,
    deleteListing
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditListing));
