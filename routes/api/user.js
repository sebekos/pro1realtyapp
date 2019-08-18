const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomBytes = require('randombytes');
const dotenv = require('dotenv');
require('dotenv').config();

const User = require('../../models/User');
const Pwreset = require('../../models/Pwreset');

// @route       POST api/user
// @description Register user
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Password is required').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('registerkey', 'Key is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.registerkey !== (process.env.REGISTER_KEY)) {
        return res.status(400).json({ errors: [{ msg: 'Please contact admin to get a registration key' }] });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        user = new User({
            name,
            email,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        // Hash password
        user.password = await bcrypt.hash(password, salt);
        // Save user
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route       POST api/user/pwreset
// @description Setup reset
// @access      Public
router.post('/pwreset', [
    check('email', 'Email is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Server Error' }] });
    }

    // Check attempts
    const pwresetcheck = await Pwreset.findOne({ email });
    if (pwresetcheck && pwresetcheck.attempts >= 3) {
        return res.status(400).json({ errors: [{ msg: 'Account disabled, please contact the admin to reset your password' }] });
    }

    // Delete previous reset links
    await Pwreset.deleteMany({ "email": email });

    pwreset = new Pwreset({
        email: email,
        hash: ''
    });

    // Encrypt key
    const salt = await bcrypt.genSalt(10);
    // Random bytes
    const random = await randomBytes(10).toString('hex');
    // Hash key
    pwreset.hash = await bcrypt.hash(random, salt);
    // Save
    await pwreset.save();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.PW_RESET_EMAIL,
            pass: process.env.PW_RESET_PW
        },
        secure: false,
        tls: { rejectUnauthorized: false }
    });

    var mailOptions = {
        from: process.env.RESET_EMAIL,
        to: email,
        subject: 'Pro 1 Realty Reset',
        text: `Follow the link below to reset your password. http://pro1mainst.com/pwresetsave/${random}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ msg: "Error sending email" });
        } else {
            res.json({ msg: "Reset email sent" });
        }
    });
    res.status(200).send('Password reset email sent');
});

// @route       POST api/user/confirmreset
// @description Reset password
// @access      Public
router.post('/pwresetsave', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('hash', 'Hash is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check hash
    const { email, password, hash } = req.body;
    // Find email
    const pwreset = await Pwreset.findOne({ email });
    // Check if there was a link sent
    if (!pwreset) {
        return res.status(400).json({ errors: [{ msg: 'Server Error' }] });
    }
    // Check if link expired, 30 mins
    if ((new Date() - new Date(pwreset.date)) > 30 * 60 * 1000) {
        return res.status(400).json({ errors: [{ msg: 'Reset link expired' }] });
    }

    const isMatch = await bcrypt.compare(hash, pwreset.hash);
    if (!isMatch) {
        const attempts = pwreset.attempts + 1;
        if (attempts >= 4) {
            await Pwreset.findOneAndUpdate({ email: email }, { $set: { attempts: attempts } }, { new: true });
            return res.status(400).json({ errors: [{ msg: 'Too many attempts' }] });
        }
        await Pwreset.findOneAndUpdate({ email: email }, { $set: { attempts: attempts } }, { new: true });
        return res.status(400).json({ errors: [{ msg: 'Server Error' }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const newPassword = await bcrypt.hash(password, salt);
    // Delete many
    await Pwreset.deleteMany({ email: email });

    user = await User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { "password": newPassword } },
        { new: true }
    );
    return res.json(user);

});

module.exports = router;