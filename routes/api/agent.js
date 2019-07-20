const express = require('express');
const router = express.Router();

// @route       GET api/agent
// @description Test route
// @access      Public
router.get('/', (req, res) => res.send('Agent route'));

module.exports = router;