import React, { useState, Fragment } from "react";
import { arrayMove } from 'react-sortable-hoc';
import ImgContainer from './ImgContainer';
import { reOrderPhotos } from '../../Redux/actions/listing';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Sortable = ({ importImages, listingId, reOrderPhotos, history }) => {
    const [images, setImages] = useState(importImages);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setImages(arrayMove(images, oldIndex, newIndex));
    };
    const onSave = e => {
        reOrderPhotos(images, listingId, history);
    };
    return (
        <Fragment>
            <ImgContainer images={images} onSortEnd={(oldIndex, newIndex) => onSortEnd(oldIndex, newIndex)} />
            <button className='btn btn-success' onClick={e => onSave(e)}>Save</button>
        </Fragment>
    );
};

Sortable.propTypes = ({
    reOrderPhotos: PropTypes.func.isRequired
})

export default connect(null, { reOrderPhotos })(Sortable);