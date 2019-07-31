import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { getListing } from '../../Redux/actions/listing';
import PropTypes from 'prop-types';
import PhotoViewer from './PhotoViewer';
import Spinner from '../layout/Spinner';
import "react-image-gallery/styles/css/image-gallery.css";

const ListingDetails = ({ getListing, match, listing: { loading, listing } }) => {
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
        description: '',
        photos: [],
        gallery: []
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
            description: loading || !listing.description ? '' : listing.description,
            photos: loading || !listing.photos ? '' : listing.photos
        });
    }, [loading]);

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
        description,
        photos
    } = formData;

    return (
        <Fragment>
            <div className="profiles">
                <div className="listingdetails bg-light">
                    {!loading ? (
                        <Fragment>
                            {photos.length > 0 ? <PhotoViewer photos={photos} /> : <h2>No Photos Exist For This Listing</h2>}
                            <div className="">
                                <h2>{address}</h2>
                                <h2>{city + ', ' + state + ' ' + zipcode}</h2>
                                <p><span className='span-item'>Type: </span>{type}</p>
                                <p><span className='span-item'>Status: </span>{status}</p>
                                <p><span className='span-item'>$</span>{price}</p>
                                {bedroom ? <p><span className='span-item'>Bedrooms: </span>{bedroom}</p> : null}
                                {bathroom ? <p><span className='span-item'>Bathrooms: {bathroom}</span></p> : null}
                                {squarefeet ? <p><span className='span-item'>Squarefeet: {squarefeet}</span></p> : null}
                                {description ? <p><span className='span-item'>Description: </span>{description}</p> : null}
                                <h2>Contact</h2>
                                {listing.agentinfo.name ? <p><span className='span-item'>Agent: </span>{listing.agentinfo.name}</p> : null}
                                {listing.agentinfo.phone ? <p><span className='span-item'>Phone: </span>{listing.agentinfo.phone}</p> : null}
                                {listing.agentinfo.email ? <p><span className='span-item'>Email: </span>{listing.agentinfo.email}</p> : null}
                            </div>
                        </Fragment>
                    ) : <Spinner />}
                </div>
            </div>
        </Fragment>
    )
}

ListingDetails.propTypes = ({
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
})

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { getListing })(ListingDetails);
