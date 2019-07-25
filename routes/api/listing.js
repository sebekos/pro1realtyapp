const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Listing = require('../../models/Listing');

// Add listing
router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('type', 'Type is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty(),
        check('state', 'State is required').not().isEmpty(),
        check('zipcode', 'Zipcode is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
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
            if (listing) {
                listing = await Listing.findOneAndUpdate(
                    { _id: req.body.id },
                    { $set: listingFields },
                    { new: true }
                );
                return res.json(listing);
            }
            listing = new Listing(listingFields)
            await listing.save();
            res.json(listing);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Get all listings
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
            }]);
        res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// Get all user listings
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
            }]);
        res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// Get one listing
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.json(listing);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.status(500).send('Server Error');
    }
}
);

// Delete listing
router.delete('/:id', auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        console.log(listing);
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