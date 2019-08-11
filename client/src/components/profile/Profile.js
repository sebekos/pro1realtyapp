import React from 'react'
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const Profile = ({ profile: { name, position, location, phone, email, photo, user, loading } }) =>
    <div className="profiles">
        <div className="profile bg-light">
            <img
                className="avatar-icon"
                src={photo ? photo : ""}
                alt=""
            />
            <div>
                <h2>{name}</h2>
                {position ? <p className='p-important'><span className='span-item'></span>{position}</p> : null}
                {location ? <p><span className='span-item'>Location: </span>{location}</p> : null}
                {phone ? <p><span className='span-item'>Phone: </span><NumberFormat
                    displayType="text"
                    format="(###) ###-####"
                    value={phone}
                /></p> : null}
                {email ? <p><span className='span-item'>Email: </span>{email}</p> : null}
            </div>
            <div>
                {!loading ? <Link className="btn btn-primary my-1" to={`/listings/${user}`}>View Listings</Link> : null}
            </div>
        </div>
    </div>

export default Profile;
