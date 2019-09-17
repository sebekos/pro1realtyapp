import React from 'react'
import { Slide } from 'react-slideshow-image';


const PhotoViewer = ({ photos }) => {
    const onLoad = photosIn => {
        var show = photosIn.map(photo => {
            return <div className="each-slide" key={photo}>
                <div style={{ 'backgroundImage': `url(${photo})` }}>
                </div>
            </div>
        });
        return show;
    }

    const properties = {
        duration: 5000,
        transitionDuration: 300,
        infinite: true,
        indicators: true,
        arrows: true
    }

    return (
        <div className="slide-container">
            <Slide {...properties}>
                {onLoad(photos)}
            </Slide>
        </div>
    )
}

export default PhotoViewer
