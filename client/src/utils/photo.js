import Resizer from "react-image-file-resizer";
import React from "react";

export const reSizer = picture => {
    return new Promise((resolve, reject) =>
        Resizer.imageFileResizer(
            picture,
            500,
            700,
            "JPEG",
            100,
            0,
            res => {
                resolve(res);
            },
            "blob"
        )
    );
};

export const bulkResize = async pictures => {
    return new Promise(async (resolve, reject) => {
        await Promise.all(
            pictures.map(picture => {
                return new Promise((resolve, reject) => resolve(reSizer(picture)));
            })
        ).then(results => {
            resolve(results);
        });
    });
};

export const options = groups => {
    return groups.map(group => {
        return <option>{group}</option>;
    });
};

export const galleryArray = photos => {
    return photos.map(photo => {
        return { original: photo, thumbnail: photo };
    });
};
