import React, { Fragment, useState } from 'react'
import ImageUploader from 'react-images-upload';
import { uploadPhotos } from '../../Redux/actions/listing';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const AddPhotos = ({ uploadPhotos, match, history }) => {
    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures(picture);
    }

    const onUpload = async e => {
        pictures.map(async picture => {
            const formData = new FormData();
            formData.append('file', picture);
            await uploadPhotos(formData, match.params.id);
        });
    }

    return (
        <Fragment>
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
    uploadPhotos: PropTypes.func.isRequired
})

export default connect(null, { uploadPhotos })(AddPhotos);
