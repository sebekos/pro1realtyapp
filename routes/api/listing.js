const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
ObjectId = require('mongodb').ObjectID;

const auth = require('../../middleware/auth');
const Listing = require('../../models/Listing');


// @route       POST api/listing
// @description Create or update listing information
// @access      Private
router.post('/', [auth,
    [
        check('listdate', 'List date is required').not().isEmpty(),
        check('status', 'Status is required').not().isEmpty(),
        check('type', 'Type is required').not().isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            listdate,
            status,
            type,
            address,
            city,
            state,
            zipcode,
            price,
            bedroom,
            bathroom,
            squarefeet,
            description,
            mainphoto,
            photos,
            agentid
        } = req.body;

        // Build listing object
        const listingFields = {};
        listingFields.agentid = req.user.id;
        if (listdate) listingFields.listdate = listdate;
        if (status) listingFields.status = status;
        if (type) listingFields.type = type;
        if (type) listingFields.type = type;
        if (address) listingFields.address = address;
        if (city) listingFields.city = city;
        if (state) listingFields.state = state;
        if (zipcode) listingFields.zipcode = zipcode;
        if (price) listingFields.price = price;
        if (bedroom) listingFields.bedroom = bedroom;
        if (bathroom) listingFields.bathroom = bathroom;
        if (squarefeet) listingFields.squarefeet = squarefeet;
        if (description) listingFields.description = description;
        if (agentid) listingFields.agentid = agentid;
        if (mainphoto) listingFields.mainphoto = mainphoto;
        if (photos) {
            listingFields.photos = photos.split(',').map(photo => photo.trim());
        }

        try {
            let listing = await Listing.findOne({ _id: req.body.id });
            // Check if user has access
            if (listing && req.user.id !== listing.agentid) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            if (listing) {
                listing = await Listing.findOneAndUpdate(
                    { _id: req.body.id },
                    { $set: listingFields },
                    { new: true }
                );
                return res.json(listing);
            }

            listing = new Listing(listingFields);
            await listing.save();
            res.json(listing);
        } catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// @route       GET api/listing
// @description Get all listings
// @access      Public
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.aggregate([
            {
                "$match": {
                    "active": "1"
                }
            },
            {
                $lookup:
                {
                    from: "profiles",
                    localField: "agentid",
                    foreignField: "user",
                    as: "agentinfo"
                }
            },
            {
                $unwind: "$agentinfo"
            },
            {
                $project: {
                    "agentinfo.active": 0,
                    "agentinfo.user": 0,
                    "agentinfo._id": 0,
                    "agentinfo.date": 0,
                    "agentinfo.__v": 0
                }
            }]).sort({ listdate: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
);

// @route       GET api/listing/user
// @description Get user listings on login
// @access      private
router.get('/user', auth, async (req, res) => {
    try {
        const listings = await Listing.aggregate([
            {
                "$match": {
                    "agentid": `${req.user.id}`,
                    "active": "1"
                }
            },
            {
                $lookup:
                {
                    from: "profiles",
                    localField: "agentid",
                    foreignField: "user",
                    as: "agentinfo"
                }
            },
            {
                $unwind: "$agentinfo"
            },
            {
                $project: {
                    "agentinfo.active": 0,
                    "agentinfo.user": 0,
                    "agentinfo._id": 0,
                    "agentinfo.date": 0,
                    "agentinfo.__v": 0
                }
            }]).sort({ listdate: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
);

// @route       GET api/listing/user/:id
// @description Get agent listings
// @access      Public
router.get('/user/:id', async (req, res) => {
    try {
        const listings = await Listing.aggregate([
            {
                "$match": {
                    "agentid": `${req.params.id}`,
                    "active": "1"
                }
            },
            {
                $lookup:
                {
                    from: "profiles",
                    localField: "agentid",
                    foreignField: "user",
                    as: "agentinfo"
                }
            },
            {
                $unwind: "$agentinfo"
            },
            {
                $project: {
                    "agentinfo.active": 0,
                    "agentinfo.user": 0,
                    "agentinfo._id": 0,
                    "agentinfo.date": 0,
                    "agentinfo.__v": 0
                }
            }]).sort({ listdate: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
);

// @route       POST /api/listing/reorderphotos/:id
// @description Reorder listing photos
// @access      Private
router.post('/refined', [], async (req, res) => {
    console.log(req.body);
    res.json('Success');
});

// @route       GET api/listing/:id
// @description Get one listing
// @access      Public
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.aggregate([
            {
                "$match": {
                    "_id": ObjectId(`${req.params.id}`),
                    "active": "1"
                }
            },
            {
                $lookup:
                {
                    from: "profiles",
                    localField: "agentid",
                    foreignField: "user",
                    as: "agentinfo"
                }
            },
            {
                $unwind: "$agentinfo"
            },
            {
                $project: {
                    "agentinfo.active": 0,
                    "agentinfo.user": 0,
                    "agentinfo._id": 0,
                    "agentinfo.date": 0,
                    "agentinfo.__v": 0
                }
            }]);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.json(listing[0]);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.status(500).send('Server Error');
    }
}
);

// @route       POST /api/listing/reorderphotos/:id
// @description Reorder listing photos
// @access      Private
router.post('/reorderphotos/:id', auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        // Check if user made listing
        if (listing.agentid !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        const check = await Listing.findByIdAndUpdate(req.params.id, { $set: { "photos": req.body } }, { new: true });
        res.json(check);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.status(500).send('Server Error');
    }
}
);

// @route       DELETE api/listing/:id
// @description Delete listing
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        // Check if user made listing
        if (listing.agentid.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Listing.findByIdAndUpdate(req.params.id, { $set: { "active": "0" } }, { new: true });
        res.json(req.params.id);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.status(500).send('Server Error');
    }
}
);

module.exports = router;