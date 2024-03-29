const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


// check if user is authenticated
exports.isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;

    console.log(token, 10)

    // Make sure token exists
    if(!token) {
        return next(new ErrorResponse('You must log in', 401));
    }

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } 
    catch(error){
        return next(new ErrorResponse('You must log in', 401));
    }
}



// middleware for admin
exports.isAdmin = (req, res, next) => {
    if(req.user.role === 'user') {
        return next(new ErrorResponse('Access denied, you must an admin', 401))
    }
    next();
}

