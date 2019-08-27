import React, { Fragment, useState, useEffect } from 'react'
import ImageUploader from 'react-images-upload';
import { uploadPhotos, getListing, maxProgressBar } from '../../Redux/actions/listing';
import { setAllAlert, removeAlerts } from '../../Redux/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Resizer from 'react-image-file-resizer';

const AddPhotos = ({ uploadPhotos, match, listing: { listing, loading, progressbar }, getListing, removeAlerts, setAllAlert, maxProgressBar }) => {
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(0);
    const [showProgress, setShowProgress] = useState(0);

    useEffect(() => {
        getListing(match.params.id);
    }, [loading, getListing]);

    const onDrop = picture => {
        if ((picture.length + listing.photos.length) > 10) {
            setUploadBtn(0);
            return setAllAlert(`Max 10 photos allowed, currently at ${picture.length + listing.photos.length}. Please delete ${picture.length + listing.photos.length - 10}`, 'danger', 10000);
        }
        if (picture.length === 0) {
            setUploadBtn(0);
            return setPictures([]);
        }
        setUploadBtn(1);
        setShowProgress(0);
        removeAlerts();
        maxProgressBar(picture.length);
        setPictures(picture);
    }

    const onUpload = async e => {
        buildFormArray(pictures);
        setUploadBtn(0);
        setShowProgress(1);
    }

    const buildFormArray = pictures => {
        var promises = pictures.map(picture => {
            return new Promise((resolve, reject) => Resizer.imageFileResizer(
                picture,
                500,
                700,
                'JPEG',
                100,
                0,
                uri => {
                    var blob = dataURLtoBlob(uri);
                    const formData = new FormData();
                    formData.append('file', blob)
                    resolve(formData);
                },
                'base64'
            ));
        });
        Promise.all(promises)
            .then(results => {
                return uploadConvertPhotos(results);
            })
    }

    const dataURLtoBlob = dataurl => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const uploadConvertPhotos = async (results) => {
        var promises = [];
        results.forEach(result => {
            promises.push(uploadPhotos(result, match.params.id));
        });

        Promise.all(promises).then(re => {
            getListing(match.params.id);
        });
    }

    return (
        <Fragment>
            <h2>Add Photos</h2>
            {showProgress ? <Progress percent={(progressbar.current / progressbar.max * 100).toFixed(0)} /> : null}
            {uploadBtn ? <button type='button' className='btn btn-success text-center' onClick={onUpload}>Upload</button> : null}
            {progressbar.current / progressbar.max === 1 ? <a className='btn btn-success' href={`/listing/${match.params.id}`}>Go To Listing</a> : null}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={pictures => onDrop(pictures)}
                imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                maxFileSize={10485760}
                withPreview={true}
            />
        </Fragment>
    )
}

AddPhotos.propTypes = ({
    uploadPhotos: PropTypes.func.isRequired,
    removeAlerts: PropTypes.func.isRequired,
    getListing: PropTypes.func.isRequired,
    maxProgressBar: PropTypes.func.isRequired,
    setAllAlert: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { uploadPhotos, removeAlerts, getListing, maxProgressBar, setAllAlert })(AddPhotos);
