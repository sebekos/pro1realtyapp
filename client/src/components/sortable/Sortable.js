import React, { useState, Fragment } from "react";
import { arrayMove } from "react-sortable-hoc";
import ImgContainer from "./ImgContainer";
import { reOrderPhotos } from "../../Redux/actions/listing";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Sortable = ({ importImages, listingId, reOrderPhotos }) => {
    const [images, setImages] = useState(importImages);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setImages(arrayMove(images, oldIndex, newIndex));
    };
    const onSave = e => {
        reOrderPhotos(images, listingId);
    };
    return (
        <Fragment>
            <div>
                <div className="text-primary large">Drag and drop photos then Save</div>
                <div className="text-dark medium">Top photo will be the first image and thumbnail</div>
            </div>
            <div>
                <button className="btn btn-success" onClick={onSave}>
                    Save
                </button>
                <Link className="btn btn-light my-1" to="/mylistings">
                    Go To Listings
                </Link>
            </div>
            <div className="sortable-container">
                <ImgContainer images={images} onSortEnd={(oldIndex, newIndex) => onSortEnd(oldIndex, newIndex)} />
            </div>
        </Fragment>
    );
};

Sortable.propTypes = {
    reOrderPhotos: PropTypes.func.isRequired
};

export default connect(null, { reOrderPhotos })(Sortable);
