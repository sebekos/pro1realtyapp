const express = require('express');
const router = express.Router();

// @route       GET api/upload
// @description Test route
// @access      Public
router.get('/', (req, res) => res.send('Upload route'));

module.exports = router;