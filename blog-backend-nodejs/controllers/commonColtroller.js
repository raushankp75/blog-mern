const User = require('../models/userModel');
const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');


const dataCount = async (req, res, next) => {
    try {
        const countData = [];
        const postData = await Post.find().count();
        const userData = await User.find({ role: req.user.role }).count();

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



// const viewPosts = async (req, res, next) => {
//     try {
//         const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name image');
//         res.status(200).json({
//             success: true,
//             posts
//         })
//     } catch (error) {
//         next(error);
//     }
// }