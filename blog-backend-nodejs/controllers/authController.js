const cloudinary = require('../utils/cloudinary');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse')


const signup = async (req, res, next) => {
    const { userSignup } = req.body;

    console.log(userSignup)

    const { name, email, password } = JSON.parse(userSignup);

    const image = req.files.image

    console.log(image)


    // const { email } = req.body;
    const userExists = await User.findOneAndDelete({ email });

    if (userExists) {
        return next(new ErrorResponse('Email id already register', 400));
    }
    try {
        // UPLOAD IMAGE IN CLOUDINARY
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'profileImg',
            width: 1200,
            crop: 'scale'
        })
        // const user = await User.create(req.body);
        const user = await User.create({
            name,
            email,
            password,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        //    Validation
        if (!email) {
            return next(new ErrorResponse('Please add an email', 403));
        }
        if (!password) {
            return next(new ErrorResponse('Please add a password', 403));
        }

        // check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 400))
        }
        // check password
        const isMatched = await user.comparePassword(password);
        if(!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
}


// created token method
const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus).cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
        success: true,
        id: user._id,
        role: user.role
    })
} 



const logout = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}



const userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({
        success: true,
        user
    })
}

module.exports = { signup, login, logout, userProfile };