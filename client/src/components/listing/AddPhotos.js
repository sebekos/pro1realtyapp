import React, { Fragment, useState } from 'react'
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/listing';
import { setAlert } from '../../Redux/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const AddPhotos = ({ uploadPhotos, match, history, setAlert }) => {
    const [pictures, setPictures] = useState([]);
    const [progress, setProgress] = useState('');

    const onDrop = picture => {
        setPictures(picture);
    }

    const onUpload = async e => {
        console.log(pictures.length);
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
            {progress !== '' ? <Progress percent={progress} /> : null}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={pictures => onDrop(pictures)}
                imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                maxFileSize={5242880}
                withPreview={true}
            />
            {pictures.length > 0 ? <button type='button' className='btn btn-success' onClick={e => onUpload(e)}>Upload</button> : null}
        </Fragment>
    )
}

AddPhotos.propTypes = ({
    uploadPhotos: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
})

export default connect(null, { uploadPhotos, setAlert })(AddPhotos);
