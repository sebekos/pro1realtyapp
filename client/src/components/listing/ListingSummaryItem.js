import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const ListingItem = ({ auth: { isAuthenticated, user, loading }, listing: { agentid, photos, listdate, status, type, address, city, state, zipcode, price, bedroom, bathroom, squarefeet, agentinfo }, listingId }) =>
    <div className="profiles">
        <div className="profile bg-light">
            {photos && photos.length > 0 ? (<Fragment>
                <img
                    className="img-icon"
                    src={photos[0]}
                    alt=""
                />
            </Fragment>) : (<Fragment>
                <div className="img-empty">
                    No Photos
                </div>
            </Fragment>)}
            <div>
                {type.includes('Confidential') ? (
                    <a href={`/listing/${listingId}`} >
                        <h2 className='text-dark'>{type}{state !== '' ? ', ' + state : null}</h2>
                    </a>
                ) : (
                        <Fragment>
                            <a href={`/listing/${listingId}`} >
                                <h2 className='text-dark'>{address + ' ' + city + ', ' + state + ' ' + zipcode}</h2>
                            </a>
                        </Fragment>

                    )}
                {price ? <p><span className='span-item'>$</span>{price.toLocaleString()}</p> : null}
                <p><span className='span-item'>Listed: </span><Moment parse="YYYY-MM-DDTHH:mm:ss.SSSZ" format="LL">{listdate}</Moment></p>
                <p><span className='span-item'>Type: </span>{type}</p>
                <p><span className='span-item'>Status: </span>{status}</p>
                {bedroom ? <p><span className='span-item'>Bedrooms: </span>{bedroom}</p> : null}
                {bathroom ? <p><span className='span-item'>Bathrooms: </span>{bathroom}</p> : null}
                {squarefeet ? <p><span className='span-item'>Squarefeet: </span>{squarefeet}</p> : null}
            </div>
            <ul>
                {!loading && isAuthenticated && user && user._id === agentid ? (
                    <Fragment>
                        <li className="text-primary">
                            <a href={`/listing/${listingId}`} className='btn btn-primary btn-custom'>View Details</a>
                        </li>
                        <li className="text-primary">
                            <a href={`/editlisting/${listingId}`} className='btn btn-primary btn-custom'>Edit Information</a>
                        </li>
                        <li className="text-primary">
                            <a href={`/editlisting/addphotos/${listingId}`} className='btn btn-primary btn-custom'>Add Photos</a>
                        </li>
                        <li className="text-primary">
                            <a href={`/editlisting/sort/${listingId}`} className='btn btn-primary btn-custom'>Sort Photos</a>
                        </li>
                        <li className="text-primary">
                            <a href={`/editlisting/delete/${listingId}`} className='btn btn-primary btn-custom'>Delete Photos</a>
                        </li>
                    </Fragment>
                ) : (
                        <Fragment>
                            {agentinfo.name ? <p><span className='span-item'>Agent: </span>{agentinfo.name}</p> : null}
                            {agentinfo.phone ? <p><span className='span-item'>Phone: </span><NumberFormat
                                displayType="text"
                                format="(###) ###-####"
                                value={agentinfo.phone}
                            /></p> : null}
                            {agentinfo.email ? <p><span className='span-item'>Email: </span>{agentinfo.email}</p> : null}
                            <li className="text-primary">
                                <a href={`/listing/${listingId}`} className='btn btn-primary my-1'>View Details</a>
                            </li>
                        </Fragment>
                    )}

            </ul>
        </div>
    </div>

ListingItem.propTypes = {
    listing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(ListingItem)
