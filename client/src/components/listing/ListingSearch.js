import React from 'react'

const ListingSearch = () => {
    return (
        <div class='listing-search-bar form'>
            <input type='text' placeholder='Zipcode' />
            <select>
                <option>Newest</option>
                <option>Oldest</option>
                <option>High Price</option>
                <option>Low Price</option>
            </select>
            <button type='submit' className='btn btn-primary'>Search</button>
        </div>
    )
}

export default ListingSearch
