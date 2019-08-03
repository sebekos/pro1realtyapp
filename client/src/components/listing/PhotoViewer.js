import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const PhotoViewer = ({ photos }) => {

    const setupGallery = photosIn => {
        var photoobj = [];
        photosIn.forEach(photo => {
            photoobj.push({
                original: photo,
                thumbnail: photo
            });
        });
        return photoobj;
    }

    return (
        <div className='photoviewer'>
            <ImageGallery items={setupGallery(photos)} showFullscreenButton={false} />
        </div>
    )
}

export default PhotoViewer
