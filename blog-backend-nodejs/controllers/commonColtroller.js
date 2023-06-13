const User = require('../models/userModel');
const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');


const dataCount = async (req, res, next) => {
    const { likes, text } = req.body;
    try {
        const countData = [];
        const postData = await Post.find().count();
        const userData = await User.find({ role: "user" }).count();

        countData.push({
            post: postData,
            user: userData
        });

        res.status(200).json({
            success: true,
            countData

        });
    } catch (error) {
       next(error);
    }
}


module.exports = { dataCount }
