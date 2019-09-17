import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { getListing } from '../../Redux/actions/listing';
import PropTypes from 'prop-types';
import PhotoViewer from './PhotoViewer';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const ListingDetails = ({ getListing, match, listing: { loading, listing } }) => {
    const [formData, setFormData] = useState({
        listdate: '',
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
            listdate: loading || !listing.listdate ? '' : listing.listdate,
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
    }, [getListing, loading]);

    const {
        listdate,
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
            {!loading && listing !== null ? (
                <div className="profiles">
                    <div className="listingdetails bg-light">
                        <Fragment>
                            {photos.length > 0 ? <PhotoViewer photos={photos} /> : <div className='listingdetails-nophotos'>No Photos Exist For This Listing</div>}
                            <div>
                                {type.includes('Confidential') ? (
                                    <Fragment>
                                        <div className='listing-details-address1'>{type}</div>
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            <div className='listing-details-address1'>{address}</div>
                                            <div className='listing-details-address2'>{city + ', ' + state + ' ' + zipcode}</div>
                                        </Fragment>

                                    )}
                                {price ? <p className='p-important'><span className='span-item'>$</span>{price.toLocaleString()}</p> : null}
                                <p><span className='span-item'>Listed: </span><Moment parse="YYYY-MM-DDTHH:mm:ss.SSSZ" format="LL">{listdate}</Moment></p>
                                <p><span className='span-item'>Type: </span>{type}</p>
                                <p><span className='span-item'>Status: </span>{status}</p>
                                {bedroom ? <p><span className='span-item'>Bedrooms: </span>{bedroom}</p> : null}
                                {bathroom ? <p><span className='span-item'>Bathrooms: </span>{bathroom}</p> : null}
                                {squarefeet ? <p><span className='span-item'>Squarefeet: </span>{squarefeet}</p> : null}
                                {description ? <p><span className='span-item'>Description: </span>{description}</p> : null}
                                <div className='listing-contact'>Contact</div>
                                {listing.agentinfo.name ? <p><span className='span-item'>Agent: </span>{listing.agentinfo.name}</p> : null}
                                {listing.agentinfo.phone ? <p><span className='span-item'>Phone: </span><NumberFormat
                                    displayType="text"
                                    format="(###) ###-####"
                                    value={listing.agentinfo.phone}
                                /></p> : null}
                                {listing.agentinfo.email ? <p><span className='span-item'>Email: </span>{listing.agentinfo.email}</p> : null}
                            </div>
                        </Fragment>
                    </div>
                </div>
            ) : <Spinner />}
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
