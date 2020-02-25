const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const config = require("config");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Listing = require("../../models/Listing");
const dotenv = require("dotenv");
require("dotenv").config();

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: process.env.AWS_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

// @route       POST api/upload/avatar
// @description Upload user avatar
// @access      Private
router.post("/avatar", [auth], (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            // Check if user made account
            if (profile.user !== req.user.id) {
                return res.status(401).json({ msg: "User not authorized" });
            }
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const fileName = `avatars/${timestamp}`;
            const data = await uploadFile(buffer, fileName, type);
            if (data) {
                await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: { photo: Object.entries(data)[1][1] } },
                    { new: true }
                );
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

// @route       POST api/upload/listingphotos
// @description Upload listing photos
// @access      Private
router.post("/listingphotos", [auth], (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            let returnUrls = [];
            const photos = await Listing.findById(fields.group[0]);
            if (!photos) {
                return res.status(400).json({ errors: [{ msg: "Listing ID Error" }] });
            }

            // Max photo limit
            if (photos.photos.length + Object.keys(files).length > 10) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: `Maximum 10 photos per a listing, currently at ${photos.photos.length}`
                        }
                    ]
                });
            }

            await Promise.all(
                Object.keys(files).map(photo => {
                    let path = files[photo][0].path;
                    let buffer = fs.readFileSync(path);
                    let type = fileType(buffer);
                    let timestamp = Date.now().toString();
                    let fileName = `listings/${fields.group[0]}/${timestamp}`;
                    return new Promise((resolve, reject) => resolve(uploadFile(buffer, fileName, type)));
                })
            )
                .then(results => {
                    returnUrls = results.map(item => {
                        return item.Location;
                    });
                })
                .catch(err => {
                    return res.status(400).json({ errors: [{ msg: "S3 Error" }] });
                });

            const photoArray = photos.photos.concat(returnUrls);
            const retObj = {
                group: fields.group[0],
                photos: photoArray
            };
            await Listing.findByIdAndUpdate(fields.group[0], { $set: { photos: photoArray } }, { new: true });
            return res.status(200).send(retObj);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

module.exports = router;
