import React, { Fragment, useState } from 'react'
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/listing';
import { setAlert } from '../../Redux/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Resizer from 'react-image-file-resizer';

const AddPhotos = ({ uploadPhotos, match, listing }) => {
    const [pictures, setPictures] = useState([]);
    const [progress, setProgress] = useState('');

    const onDrop = picture => {
        setPictures(picture);
        setProgress('');
    }

    const dataURLtoBlob = dataurl => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const onUpload = async e => {
        setProgress(0);
        var count = 0;
        pictures.map(async (picture, index) => {
            Resizer.imageFileResizer(
                picture,
                800,
                1200,
                'JPEG',
                100,
                0,
                async uri => {
                    var blob = dataURLtoBlob(uri);
                    const formData = new FormData();
                    formData.append('file', blob);
                    await uploadPhotos(formData, match.params.id);
                    count = count + 1;
                    setProgress((count / pictures.length * 100).toFixed());
                },
                'base64'
            );
        });
    }

    return (
        <Fragment>
            <h2>Add Photos</h2>
            {progress !== '' && listing.error === null ? <Progress percent={progress} /> : null}
            {pictures.length > 0 && progress === '' ? <button type='button' className='btn btn-success' onClick={e => onUpload(e)}>Upload</button> : null}
            {progress >= 99 && listing.error === null ? <a className='btn btn-success' href={`/listing/${match.params.id}`}>Go To Listing</a> : null}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={pictures => onDrop(pictures)}
                imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                maxFileSize={5242880}
                withPreview={true}
            />
        </Fragment>
    )
}

AddPhotos.propTypes = ({
    uploadPhotos: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { uploadPhotos, setAlert })(AddPhotos);
