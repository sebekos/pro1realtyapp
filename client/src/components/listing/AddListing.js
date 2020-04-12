import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addListing } from "../../Redux/actions/listing";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import States from "../layout/States";
import styled from "styled-components";
import GenForm from "../universal/GenForm";
import GenInput from "../universal/GenInput";
import TextArea from "../universal/TextArea";
import DropDown from "../universal/DropDown";
import PrimaryButton from "../universal/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";

const AddListingContainer = styled.div`
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

const AddListing = ({ addListing, history }) => {
    const [listdate, setListDate] = useState("");

    const [formData, setFormData] = useState({
        status: "Active",
        type: "Residential",
        address: "",
        city: "",
        state: "IL",
        zipcode: "",
        price: "",
        soldprice: "",
        bedroom: "",
        bathroom: "",
        squarefeet: "",
        description: ""
    });

    const { status, type, address, city, state, zipcode, price, soldprice, bedroom, bathroom, squarefeet, description } = formData;

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
        await addListing(listingData, history);
    };

    const onDate = (date) => {
        setListDate(date);
    };

    return (
        <AddListingContainer>
            <TitleText>Listing Information</TitleText>
            <Form onSubmit={onSubmit}>
                <DatePicker
                    placeholderText="* Select listed date"
                    selected={listdate}
                    onChange={(date) => onDate(date)}
                    maxDate={new Date()}
                />
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
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </Form>
        </AddListingContainer>
    );
};

AddListing.propTypes = {
    addListing: PropTypes.func.isRequired,
    history: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    addListing
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddListing));
