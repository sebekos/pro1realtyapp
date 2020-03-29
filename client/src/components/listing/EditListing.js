import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addListing, getListing, deleteListing } from "../../Redux/actions/listing";
import DatePicker from "react-datepicker";
import States from "../layout/States";
import "react-datepicker/dist/react-datepicker.css";

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
        bedroom: "",
        bathroom: "",
        squarefeet: "",
        description: "",
        ldate: ""
    });

    useLayoutEffect(() => {
        getListing(match.params.id);
        setFormData({
            id: loading || !listing._id ? "" : listing._id,
            status: loading || !listing.status ? "" : listing.status,
            type: loading || !listing.type ? "" : listing.type,
            address: loading || !listing.address ? "" : listing.address,
            city: loading || !listing.city ? "" : listing.city,
            state: loading || !listing.state ? "" : listing.state,
            zipcode: loading || !listing.zipcode ? "" : listing.zipcode,
            price: loading || !listing.price ? "" : listing.price,
            bedroom: loading || !listing.bedroom ? "" : listing.bedroom,
            bathroom: loading || !listing.bathroom ? "" : listing.bathroom,
            squarefeet: loading || !listing.squarefeet ? "" : listing.squarefeet,
            description: loading || !listing.description ? "" : listing.description,
            ldate: loading || !listing.listdate ? "" : setUpDate(listing.listdate)
        });
    }, [loading, getListing]);

    const setUpDate = data => {
        var date = new Date(data);
        setListDate(new Date(date));
    };

    const { id, status, type, address, city, state, zipcode, price, bedroom, bathroom, squarefeet, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const listingData = {
            ...formData,
            listdate: listdate
        };
        console.log(listingData);
        await addListing(listingData, history, true);
    };

    const onDelete = e => {
        e.preventDefault();
        if (!window.confirm("This will delete this listing. Press OK to continue")) {
            return;
        }
        deleteListing(listing._id, history);
    };

    const onDate = date => {
        setListDate(date);
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Listing Information</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <DatePicker placeholderText="* Select listed date" selected={listdate} onChange={onDate} maxDate={new Date()} />
                </div>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChange}>
                        <option>Active</option>
                        <option>Under Contract</option>
                        <option>Pending</option>
                        <option>Closed</option>
                    </select>
                </div>
                <div className="form-group">
                    <select name="type" value={type} onChange={onChange}>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Confidential - Residential</option>
                        <option>Confidential - Commercial</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Address" name="address" value={address} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City" name="city" value={city} onChange={onChange} />
                </div>
                <div className="form-group">
                    <States update={onChange} chosen={state} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Zipcode" name="zipcode" value={zipcode} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Price" name="price" value={price} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Bedroom" name="bedroom" value={bedroom} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Bathroom" name="bathroom" value={bathroom} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Squarefeet" name="squarefeet" value={squarefeet} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Description" name="description" value={description} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/mylistings">
                    Go Back
                </Link>
                <button className="btn btn-danger my-1" onClick={onDelete} type="button">
                    Delete
                </button>
            </form>
        </Fragment>
    );
};

EditListing.propTypes = {
    addListing: PropTypes.func.isRequired,
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired,
    deleteListing: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    listing: state.listing
});

export default connect(mapStateToProps, { addListing, getListing, deleteListing })(withRouter(EditListing));
