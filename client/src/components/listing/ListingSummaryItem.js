import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ListingItem = ({ auth: { isAuthenticated }, listing: { photos, status, type, address, city, state, zipcode, price, bedroom, bathroom, squarefeet, description, _id }, listingId }) =>
    <div className="profiles">
        <div className="profile bg-light">
            <img
                className="img"
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
                <li className="text-primary">
                    {isAuthenticated ? (<a href={`/editlisting/${listingId}`} className='btn btn-primary my-1'>
                        Edit Information
                    </a>) : null}
                </li>
                <li className="text-primary">
                    {isAuthenticated ? (<a href={`/editlisting/photos/${listingId}`} className='btn btn-primary my-1'>
                        Add/Edit Photos
                    </a>) : null}
                </li>
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
