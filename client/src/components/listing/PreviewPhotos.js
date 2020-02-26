import React from "react";

const PreviewPhotos = ({ click, photos }) => {
    return (
        <div className="preview-photos-container">
            <img style={{ justifySelf: "end" }} onClick={click} src={photos[0]} alt="photo1" />

            <img style={{ justifySelf: "start" }} onClick={click} src={photos[1]} alt="photo2" />

            <img style={{ justifySelf: "end" }} onClick={click} src={photos[2]} alt="photo3" />

            <img style={{ justifySelf: "start" }} onClick={click} src={photos[3]} alt="photo4" />
        </div>
    );
};

export default PreviewPhotos;
