import React, { useState, Fragment } from "react";
import { arrayMove } from 'react-sortable-hoc';
import ImgContainer from './ImgContainer';
import { reOrderPhotos } from '../../Redux/actions/listing';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
            <div>
                <div className='text-primary medium'>
                    Drag and drop photos then press Save
                </div>
            </div>
            <div>
                <button className='btn btn-success' onClick={e => onSave(e)}>Save</button>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </div>
            <div className='sortable-container'>
                <ImgContainer images={images} onSortEnd={(oldIndex, newIndex) => onSortEnd(oldIndex, newIndex)} />
            </div>
        </Fragment>
    );
};

Sortable.propTypes = ({
    reOrderPhotos: PropTypes.func.isRequired
})

export default connect(null, { reOrderPhotos })(Sortable);