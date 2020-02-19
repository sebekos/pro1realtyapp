const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Office = require("../../models/Office");

// @route   GET api/office
// @desc    Get office info
// @access  Public
router.get("/", async (req, res) => {
    try {
        const office = await Office.findOne().select("-_id");
        res.json(office);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/office
// @description Create or update office information
// @access      Private
router.post(
    "/:id",
    [
        auth,
        [
            check("address", "Address is required")
                .not()
                .isEmpty(),
            check("city", "City is required")
                .not()
                .isEmpty(),
            check("state", "State is required")
                .not()
                .isEmpty(),
            check("zipcode", "Zipcode is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        // Check if user has access
        if (req.user.access != "1") {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address, city, state, zipcode, phone, email } = req.body;

        // Build profile object
        const officeFields = {};
        if (address) officeFields.address = address;
        if (city) officeFields.city = city;
        if (state) officeFields.state = state;
        if (zipcode) officeFields.zipcode = zipcode;
        if (phone) officeFields.phone = phone;
        if (email) officeFields.email = email;

        try {
            let office = await Office.findOne({ _id: req.body.id });
            // Update
            if (office) {
                office = await Office.findOneAndUpdate({ _id: req.body.id }, { $set: officeFields }, { new: true });
                return res.json(office);
            }

            // Create new
            office = new Office(officeFields);
            await office.save();
            res.json(office);
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
