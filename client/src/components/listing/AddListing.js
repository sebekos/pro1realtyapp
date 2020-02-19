import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addListing } from "../../Redux/actions/listing";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import States from "../layout/States";
import "react-datepicker/dist/react-datepicker.css";

const AddListing = ({ addListing, history, auth: { user } }) => {
    const [listdate, setListDate] = useState("");

    const [formData, setFormData] = useState({
        status: "Listed",
        type: "Residential",
        address: "",
        city: "",
        state: "IL",
        zipcode: "",
        price: "",
        bedroom: "",
        bathroom: "",
        squarefeet: "",
        description: ""
    });

    const { status, type, address, city, state, zipcode, price, bedroom, bathroom, squarefeet, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const listingData = {
            ...formData,
            listdate: listdate
        };
        await addListing(listingData, history);
    };

    const onDate = date => {
        setListDate(date);
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Listing Information</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <DatePicker
                        placeholderText="* Select listed date"
                        selected={listdate}
                        onChange={date => onDate(date)}
                        maxDate={new Date()}
                    />
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
                    <input
                        type="text"
                        placeholder="Squarefeet"
                        name="squarefeet"
                        value={squarefeet}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </Fragment>
    );
};

AddListing.propTypes = {
    addListing: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addListing })(withRouter(AddListing));
