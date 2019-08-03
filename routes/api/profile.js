const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @description Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/profile
// @description Create or update user profile
// @access      Private
router.post('/', [auth, [
    check('position', 'Position is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        position,
        location,
        phone,
        email
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (position) profileFields.position = position;
    if (location) profileFields.location = location;
    if (phone) profileFields.phone = phone;
    if (email) profileFields.email = email;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        //Update
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        // Create new
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
    }
});

// @route       GET api/profile
// @description Get all profiles
// @access      Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find({ active: 1 });
        res.json(profiles);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/profile/user/user_id
// @description Get single profile
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id, active: 1 }).populate('user', ['name']);

        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/profile
// @description Get single profile
// @access      Private
router.delete('/', auth, async (req, res) => {
    // Build profile object
    const profileFields = {};
    profileFields.active = 1;
    try {
        await Profile.findOneAndUpdate({ user: req.user.id }, { $set: { "active": "0" } }, { new: true });
        await User.findOneAndUpdate({ _id: req.user.id }, { $set: { "access": "0" } }, { new: true });

        res.json({ msg: 'User Deactivated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;