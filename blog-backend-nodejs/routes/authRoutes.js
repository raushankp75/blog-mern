const express = require('express');
const router = express.Router();


// import controller
const { signup, login, logout, userProfile, AllUsers, singleUser } = require('../controllers/authController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/auth');


// auth routes - // /api/
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuthenticated, userProfile);
router.get('/singleuser/:id', isAuthenticated, singleUser);
router.get('/allusers', isAuthenticated, AllUsers);



module.exports = router;