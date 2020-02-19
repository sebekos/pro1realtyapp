import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import DeleteItem from "./DeleteItem";
import { getListing, reOrderPhotos } from "../../Redux/actions/listing";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DeletePhotos = ({ match, getListing, reOrderPhotos, listing: { listing, loading } }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getListing(match.params.id);
        setPhotos(loading || !listing.photos ? [] : listing.photos);
    }, [getListing, loading]);

    const onDelete = e => {
        let newPhotos = [];
        let image = e.target.getAttribute("image");
        newPhotos = photos.filter(photo => {
            return photo !== image;
        });
        setPhotos(newPhotos);
    };

    const onSave = e => {
        e.preventDefault();
        reOrderPhotos(photos, match.params.id);
    };

    return (
        <Fragment>
            <div>
                <button onClick={onSave} type="button" className="btn btn-success">
                    Save
                </button>
                <Link className="btn btn-light my-1" to="/mylistings">
                    Go To Listings
                </Link>
            </div>
            <div className="delete-container">
                {!loading ? (
                    photos.map((photo, index) => <DeleteItem image={photo} ondelete={onDelete} key={index} />)
                ) : (
                    <Spinner />
                )}
            </div>
        </Fragment>
    );
};

DeletePhotos.propTypes = {
    getListing: PropTypes.func.isRequired,
    reOrderPhotos: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

export default connect(mapStateToProps, { getListing, reOrderPhotos })(DeletePhotos);
