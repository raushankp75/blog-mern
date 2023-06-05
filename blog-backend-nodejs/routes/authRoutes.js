const express = require('express');
const router = express.Router();


// import controller
const { signup, login, logout, userProfile } = require('../controllers/authController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/auth');


// auth routes - // /api/
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isAuthenticated, userProfile);



module.exports = router;