import React, { useEffect, useState } from 'react';
import { getListing } from '../../Redux/actions/listing';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Sortable from '../sortable/Sortable';



const PhotoSortable = ({ match, listing: { listing, loading }, getListing }) => {
    const [sortphotos, setSortPhotos] = useState([]);

    useEffect(() => {
        getListing(match.params.id);
        setSortPhotos(loading || !listing.photos ? [] : listing.photos);
    }, [loading]);

    const onCheck = e => {
        console.log(sortphotos);
    }

    return (
        <div>
            {!loading && sortphotos.length > 0 ? <Sortable importImages={sortphotos} listingId={listing._id} /> : <Spinner />}
            <button className='btn btn=primary' onClick={e => onCheck(e)}>Check</button>
        </div>
    )
}

PhotoSortable.propTypes = ({
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { getListing })(PhotoSortable);
