const express = require('express');
const router = express.Router();

// @route       GET api/admin
// @description Test route
// @access      Public
router.get('/', (req, res) => res.send('Admin route'));

module.exports = router;