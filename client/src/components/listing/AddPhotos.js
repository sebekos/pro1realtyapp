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
    const [max, setMax] = useState(0);

    useEffect(() => {
        setMax(loading || !listing.photos || listing.photos == null ? 0 : listing.photos.length);
        getListing(match.params.id)
    }, [loading, getListing]);

    const onDrop = picture => {
        if ((picture.length + max) > 10) {
            return setAllAlert(`Max 10 photos allowed, currently at ${picture.length + max}. Please remove ${picture.length + max - 10}`, 'danger', 10000);
        }
        if (picture.length === 0) {
            return setPictures([]);
        }
        removeAlerts();
        maxProgressBar(picture.length);
        setPictures(picture);
    }

    const onUpload = async e => {
        buildFormArray(pictures);
    }

    const buildFormArray = pictures => {
        var promises = pictures.map((picture, index) => {
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

    const uploadConvertPhotos = (results) => {
        results.map(result => {
            uploadPhotos(result, match.params.id);

        })
    }

    return (
        <Fragment>
            <h2>Add Photos</h2>
            {!loading && progressbar.current !== '' ? <Progress percent={(progressbar.current / progressbar.max * 100).toFixed(0)} /> : null}
            {pictures.length > 0 ? <button type='button' className='btn btn-success text-center' onClick={e => onUpload(e)}>Upload</button> : null}
            {progressbar.current / progressbar.max === 1 ? <a className='btn btn-primary' href={`/listing/${match.params.id}`}>Go To Listing</a> : null}
            {!loading && progressbar.current / progressbar.max !== 100 ? <div className='text-dark small'>Your listing has {max} photos. Maximum of 10 per a listing.</div> : null}
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
    removeAlerts: PropTypes.func.isRequired,
    getListing: PropTypes.func.isRequired,
    maxProgressBar: PropTypes.func.isRequired,
    setAllAlert: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    listing: state.listing
})

export default connect(mapStateToProps, { uploadPhotos, removeAlerts, getListing, maxProgressBar, setAllAlert })(AddPhotos);
