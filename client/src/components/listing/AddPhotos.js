import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import {
    uploadPhotos,
    getListing,
    setLoadingTrue,
    progressBarValue,
    toggleProgressBar
} from '../../Redux/actions/listing';
import { connect } from 'react-redux';
import { bulkResize } from '../../utils/photo';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProgressBar from '../layout/ProgressBar';

const AddPhotos = ({
    uploadPhotos,
    match,
    listing: { loading, progressbar },
    getListing,
    setLoadingTrue
}) => {
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);

    useEffect(() => {
        getListing(match.params.id);
    }, [match.params.id]);

    const onDrop = picture => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async e => {
        setLoadingTrue();
        setUploadBtn(false);
        let res = await bulkResize(pictures);
        let formData = new FormData();
        formData.append('group', match.params.id);
        res.map((photo, index) => {
            formData.append(`photo-${index}`, photo);
        });
        await uploadPhotos(formData);
        setUploadBtn(true);
    };

    return (
        <div>
            {loading ? <Spinner /> : null}
            <div className='upload-images'>
                <ImageUploader
                    withIcon={false}
                    buttonText='Choose images'
                    onChange={pictures => onDrop(pictures)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                    maxFileSize={30485760}
                    withPreview={true}
                />
                {uploadBtn ? (
                    <button onClick={onUpload}>Upload images</button>
                ) : null}
                {progressbar ? <ProgressBar /> : null}
            </div>
        </div>
    );
};

AddPhotos.propTypes = {
    getListing: PropTypes.func.isRequired,
    uploadPhotos: PropTypes.func.isRequired,
    setLoadingTrue: PropTypes.func.isRequired,
    progressBarValue: PropTypes.func.isRequired,
    toggleProgressBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    listing: state.listing
});

export default connect(
    mapStateToProps,
    {
        uploadPhotos,
        getListing,
        setLoadingTrue,
        progressBarValue,
        toggleProgressBar
    }
)(AddPhotos);
