const express = require('express');
const router = express.Router();


// import controller
const { dataCount } = require('../controllers/commonColtroller');


// import authentication middleware
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// blog post routes
router.get('/data/count', isAuthenticated, dataCount);




module.exports = router;