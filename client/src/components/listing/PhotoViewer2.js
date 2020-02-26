import React, { Fragment, useState } from "react";
import ImgsViewer from "react-images-viewer";
import PreviewPhotos from "./PreviewPhotos";

const PhotoViewer2 = ({ photos }) => {
    const [currImg, setCurrImg] = useState(0);
    const [open, setOpen] = useState(false);

    const onNextImg = () => {
        setCurrImg(currImg + 1);
    };

    const onPrevImg = () => {
        setCurrImg(currImg - 1);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClickThumbnail = () => {
        setOpen(!open);
    };

    return (
        <Fragment>
            <PreviewPhotos click={onClickThumbnail} photos={photos} />
            <ImgsViewer
                backdropCloseable={true}
                currImg={currImg}
                imgs={photos.map(photo => {
                    return { src: photo };
                })}
                isOpen={open}
                onClickPrev={onPrevImg}
                onClickNext={onNextImg}
                onClose={onClose}
                showThumbnails={true}
                onClickThumbnail={onClickThumbnail}
            />
        </Fragment>
    );
};

export default PhotoViewer2;
