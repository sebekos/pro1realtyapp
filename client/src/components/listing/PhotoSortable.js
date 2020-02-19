import React, { useEffect, useState, Fragment } from "react";
import { getListing } from "../../Redux/actions/listing";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Sortable from "../sortable/Sortable";

const PhotoSortable = ({ match, listing: { listing, loading }, getListing }) => {
    const [sortphotos, setSortPhotos] = useState([]);

    useEffect(() => {
        getListing(match.params.id);
        setSortPhotos(loading || !listing.photos ? [] : listing.photos);
    }, [loading, getListing]);

    return (
        <Fragment>
            {!loading && sortphotos.length > 0 ? (
                <Sortable importImages={sortphotos} listingId={listing._id} />
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

PhotoSortable.propTypes = {
    getListing: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

export default connect(mapStateToProps, { getListing })(PhotoSortable);
