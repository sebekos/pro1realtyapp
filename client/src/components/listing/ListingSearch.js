import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getRefinedListings } from '../../Redux/actions/listing';
import { connect } from 'react-redux'

const ListingSearch = ({ getRefinedListings }) => {
    const [formData, setFormData] = useState({
        zipcode: '',
        type: 'Newest'
    });

    const {
        zipcode,
        type
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSearch = () => {
        getRefinedListings(formData);
    }

    return (
        <div className='listing-search-bar form'>
            <input onChange={onChange} name='zipcode' value={zipcode} type='text' placeholder='Zipcode' />
            <select name="type" value={type} onChange={onChange}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>High Price</option>
                <option>Low Price</option>
            </select>
            <button onClick={onSearch} type='submit' className='btn btn-primary'>Search</button>
        </div>
    )
}

ListingSearch.propTypes = ({
    getRefinedListings: PropTypes.func.isRequired
})

export default connect(null, { getRefinedListings })(ListingSearch);
