//for this, first we require express router module for routing all the get,post.... requests and responses
const express = require('express');
const router = express.Router();
console.log('router loaded');
router.use('/api',require('./api'));
module.exports = router;