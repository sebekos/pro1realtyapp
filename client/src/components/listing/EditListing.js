import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { addListing, getListing, deleteListing } from '../../Redux/actions/listing';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditListing = ({ addListing, getListing, history, match, listing: { loading, listing }, deleteListing }) => {
    const [listdate, setListDate] = useState('');
    const [formData, setFormData] = useState({
        status: '',
        type: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        price: '',
        bedroom: '',
        bathroom: '',
        squarefeet: '',
        description: ''
    });

    useEffect(() => {
        getListing(match.params.id);
        setFormData({
            status: loading || !listing.status ? '' : listing.status,
            type: loading || !listing.type ? '' : listing.type,
            address: loading || !listing.address ? '' : listing.address,
            city: loading || !listing.city ? '' : listing.city,
            state: loading || !listing.state ? '' : listing.state,
            zipcode: loading || !listing.zipcode ? '' : listing.zipcode,
            price: loading || !listing.price ? '' : listing.price,
            bedroom: loading || !listing.bedroom ? '' : listing.bedroom,
            bathroom: loading || !listing.bathroom ? '' : listing.bathroom,
            squarefeet: loading || !listing.squarefeet ? '' : listing.squarefeet,
            description: loading || !listing.description ? '' : listing.description
        })
    }, [loading, getListing]);

    const {
        status,
        type,
        address,
        city,
        state,
        zipcode,
        price,
        bedroom,
        bathroom,
        squarefeet,
        description
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addListing(formData, history);
    }

    const onDelete = e => {
        e.preventDefault();
        deleteListing(listing._id, history);
    }

    const onDate = date => {
        setListDate(date);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Listing Information
            </h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <DatePicker
                        placeholderText='* Select listed date'
                        selected={listdate}
                        onChange={e => onDate(e)}
                        maxDate={new Date()} />
                </div>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)} >
                        <option>Listed</option>
                        <option>Closed</option>
                    </select>
                </div>
                <div className="form-group">
                    <select name="type" value={type} onChange={e => onChange(e)} >
                        <option>Residential</option>
                        <option>Commercial</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Address" name="address" value={address} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City" name="city" value={city} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="State" name="state" value={state} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Zipcode" name="zipcode" value={zipcode} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Price" name="price" value={price} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Bedroom" name="bedroom" value={bedroom} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Bathroom" name="bathroom" value={bathroom} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Squarefeet" name="squarefeet" value={squarefeet} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Description" name="description" value={description} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                <button className="btn btn-danger my-1" to="/dashboard" onClick={e => onDelete(e)} type="button">Delete</button>
            </form>
        </Fragment >
    )
}

EditListing.propTypes = ({
    addListing: PropTypes.func.isRequired,
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired,
    deleteListing: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    auth: state.auth,
    listing: state.listing
})

export default connect(mapStateToProps, { addListing, getListing, deleteListing })(withRouter(EditListing));
