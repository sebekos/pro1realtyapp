import React from "react";

const SearchBar = ({ onChange, onSearch, data: { zipcode, type, group } }) => {
    return (
        <div className="listing-search-bar form">
            <input onChange={onChange} name="zipcode" value={zipcode} type="text" placeholder="Zipcode" />
            <select name="group" value={group} onChange={onChange}>
                <option>All</option>
                <option>Commercial</option>
                <option>Residential</option>
            </select>
            <select name="type" value={type} onChange={onChange}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>High Price</option>
                <option>Low Price</option>
            </select>
            <button onClick={onSearch} type="submit" className="btn btn-primary">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
