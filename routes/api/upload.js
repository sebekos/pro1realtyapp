const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Listing = require('../../models/Listing');



// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : config.get('AWS_SECRET_ACCESS_KEY')
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_BUCKET ? process.env.AWS_BUCKET : config.get('AWS_BUCKET'),
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
};

// @route       POST api/upload/avatar
// @description Upload user avatar
// @access      Private
router.post('/avatar', [auth], (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            // Check if user made account
            if (profile.user !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const fileName = `avatars/${timestamp}`;
            const data = await uploadFile(buffer, fileName, type);
            if (data) {
                await Profile.findOneAndUpdate({ user: req.user.id }, { $set: { "photo": Object.entries(data)[1][1] } }, { new: true });
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

// @route       POST api/upload/listingphotos/:id
// @description Upload listing photos
// @access      Private
router.post('/listingphotos/:id', [auth], (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
            const listing = await Listing.findById(req.params.id);
            // Max photo limit
            if ('photos' in listing && listing.photos.length > 9) {
                return res.status(400).json({ errors: [{ msg: `Maximum 10 photos per a listing, currently at ${listing.photos.length}` }] });
            }
            // Check if user made listing
            if (listing.agentid !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const fileName = `listings/${req.params.id}/${timestamp}`;
            const data = await uploadFile(buffer, fileName, type);
            if (data) {
                await Listing.findByIdAndUpdate(req.params.id, { $push: { "photos": Object.entries(data)[1][1] } }, { new: true });
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    });
});

module.exports = router;