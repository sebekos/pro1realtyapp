import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const Profile = ({ profile: { name, position, location, phone, email, photo, user, loading }, auth: { isAuthenticated } }) =>
    <div className="profiles">
        <div className="profile bg-light">
            <img
                className="avatar-icon"
                src={photo ? photo : ""}
                alt=""
            />
            <div>
                <h2>{name}</h2>
                {position ? <p><span className='span-item'>Position: </span>{position}</p> : null}
                {location ? <p><span className='span-item'>Location: </span>{location}</p> : null}
                {phone ? <p><span className='span-item'>Phone: </span>{phone}</p> : null}
                {email ? <p><span className='span-item'>Email: </span>{email}</p> : null}
            </div>
            <div>
                {!loading ? <Link className="btn btn-primary my-1" to={`/listings/${user._id}`}>View Listings</Link> : null}
            </div>
        </div>
    </div>

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Profile)
