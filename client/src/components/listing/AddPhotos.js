import React, { Fragment, useState } from 'react'
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/listing';
import { setAlert } from '../../Redux/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { Link } from 'react-router-dom';

const AddPhotos = ({ uploadPhotos, match, history, setAlert }) => {
    const [pictures, setPictures] = useState([]);
    const [progress, setProgress] = useState('');

    const onDrop = picture => {
        setPictures(picture);
        setProgress('');
    }

    const onUpload = async e => {
        setProgress(0);
        var count = 0;
        pictures.map(async (picture, index) => {
            const formData = new FormData();
            formData.append('file', picture);
            await uploadPhotos(formData, match.params.id)
                .then(results => {
                    count = count + 1;
                    setProgress((count / pictures.length) * 100)
                });
        });
    }

    return (
        <Fragment>
            <h2>Add Photos</h2>
            {progress !== '' ? <Progress percent={progress} /> : null}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={pictures => onDrop(pictures)}
                imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                maxFileSize={5242880}
                withPreview={true}
            />
            {pictures.length > 0 && progress === '' ? <button type='button' className='btn btn-success' onClick={e => onUpload(e)}>Upload</button> : null}
            {progress === 100 ? <a className='btn btn-success' href={`/listing/${match.params.id}`}>Go To Listing</a> : null}
        </Fragment>
    )
}

AddPhotos.propTypes = ({
    uploadPhotos: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
})

export default connect(null, { uploadPhotos, setAlert })(AddPhotos);
