const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { listingQuery, refinedMatch, singleMatch, setListingFields } = require("../../utils/listing/listing");
ObjectId = require("mongodb").ObjectID;

const auth = require("../../middleware/auth");
const Listing = require("../../models/Listing");

// @route       POST api/listing
// @description Create or update listing information
// @access      Private
router.post(
    "/",
    [
        auth,
        [
            check("listdate", "List date is required")
                .not()
                .isEmpty(),
            check("status", "Status is required")
                .not()
                .isEmpty(),
            check("type", "Type is required")
                .not()
                .isEmpty(),
            check("bedroom", "Bedrooms is required")
                .not()
                .isEmpty(),
            check("bathroom", "Bathrooms is required")
                .not()
                .isEmpty(),
            check("squarefeet", "Squarefeet is required")
                .not()
                .isEmpty(),
            check("price", "Price is required")
                .not()
                .isEmpty(),
            check("description", "Description is required (min 30 characters, max 1000)").isLength({ min: 30, max: 1000 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const listingFields = setListingFields(req);
        try {
            let listing = null;
            // If new listing
            if (!req.body.id) {
                listing = new Listing(listingFields);
                await listing.save();
                return res.json(listing);
            }
            // If updating, check if user has access
            listing = await Listing.findOne({ _id: req.body.id });
            if (listing && req.user.id !== listing.agentid) {
                return res.status(401).json({ msg: "User not authorized" });
            }
            listing = await Listing.findOneAndUpdate({ _id: req.body.id }, { $set: listingFields }, { new: true });
            res.json(listing);
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

// @route       POST /api/listing/reorderphotos/:id
// @description Reorder listing photos
// @access      Public
router.post("/refined", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const reqData = req.body ? req.body : {};
    const match = refinedMatch(reqData);
    try {
        let listingsCount = await Listing.aggregate([
            match[0],
            {
                $count: "count"
            }
        ]);
        const listings = await Listing.aggregate(match.concat(listingQuery));
        listingsCount = listingsCount[0] ? listingsCount[0]["count"] : 0;
        res.json({
            data: listings,
            totalCount: listingsCount
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// @route       GET api/listing/:id
// @description Get one listing
// @access      Public
router.get("/:id", async (req, res) => {
    try {
        const match = singleMatch(req.params.id);
        const listing = await Listing.aggregate(match);
        if (!listing) {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.json(listing[0]);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route       GET api/listing/count/:id
// @description Get photo count of one listing
// @access      Public
router.get("/count/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.json({ id: req.params.id, count: listing.photos.length });
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route       POST /api/listing/reorderphotos/:id
// @description Reorder listing photos
// @access      Private
router.post("/reorderphotos/:id", auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        // Check if user made listing
        if (listing.agentid !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const check = await Listing.findByIdAndUpdate(req.params.id, { $set: { photos: req.body } }, { new: true });
        res.json(check);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route       DELETE api/listing/:id
// @description Delete listing
// @access      Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        // Check if user made listing
        if (listing.agentid.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await Listing.findByIdAndUpdate(req.params.id, { $set: { active: "0" } }, { new: true });
        res.json(req.params.id);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Listing not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
