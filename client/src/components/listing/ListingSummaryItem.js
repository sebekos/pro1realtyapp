import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ListingItem = ({ auth: { isAuthenticated, user, loading }, listing: { agentid, photos, status, type, address, city, state, zipcode, price, bedroom, bathroom, squarefeet, description, agentinfo }, listingId }) =>
    <div className="profiles">
        <div className="profile bg-light">
            <img
                className="img-icon"
                src={photos ? photos[0] : ""}
                alt=""
            />
            <div>
                <h2>{address + ' ' + city + ', ' + state + ' ' + zipcode}</h2>
                <p><span className='span-item'>Type: </span>{type}</p>
                <p><span className='span-item'>Status: </span>{status}</p>
                <p><span className='span-item'>$</span>{price}</p>
                {bedroom ? <p><span className='span-item'>Bedrooms: </span>{bedroom}</p> : null}
                {bathroom ? <p><span className='span-item'>Bathrooms: {bathroom}</span></p> : null}
                {squarefeet ? <p><span className='span-item'>Squarefeet: {squarefeet}</span></p> : null}
                {description ? <p><span className='span-item'>Description: </span>{description}</p> : null}
            </div>
            <ul>
                {!loading && isAuthenticated && user._id === agentid ? (
                    <Fragment>
                        <li className="text-primary">
                            <a href={`/listing/${listingId}`} className='btn btn-primary btn-custom'>View Details</a>
                        </li>
                        <li className="text-primary">
                            {isAuthenticated ? (<a href={`/editlisting/${listingId}`} className='btn btn-primary btn-custom'>Edit Information</a>) : null}
                        </li>
                        <li className="text-primary">
                            {isAuthenticated ? (<a href={`/editlisting/addphotos/${listingId}`} className='btn btn-primary btn-custom'>Add Photos</a>) : null}
                        </li>
                        <li className="text-primary">
                            {isAuthenticated ? (<a href={`/editlisting/sort/${listingId}`} className='btn btn-primary btn-custom'>Sort Photos</a>) : null}
                        </li>
                    </Fragment>
                ) : (
                        <Fragment>
                            {agentinfo.name ? <p><span className='span-item'>Agent: </span>{agentinfo.name}</p> : null}
                            {agentinfo.phone ? <p><span className='span-item'>Phone: </span>{agentinfo.phone}</p> : null}
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
