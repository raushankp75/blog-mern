const cloudinary = require('../utils/cloudinary');
const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');


const createPost = async (req, res, next) => {
    const { title, content, postedBy, image, likes, comments } = req.body;

    try {
        // UPLOAD IMAGE IN CLOUDINARY
        const result = await cloudinary.uploader.upload(image, {
            folder: 'posts',
            width: 1200,
            crop: 'scale'
        })
        const post = await Post.create({
            title,
            content,
            postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
        res.status(201).json({
            success: true,
            post
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}



const viewPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
        res.status(201).json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}


const viewSinglePost = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id).populate('comments.postedBy', 'name');
        res.status(201).json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}



const deletePost = async (req, res, next) => {
    const currentPost = await Post.findById(req.params.id);

    // DELETE POST IMAGE FROM CLOUDINARY
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }


    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Post Deleted'
        })
    } catch (error) {
        next(error);
    }
}



const updatePost = async (req, res, next) => {
    try {
        const { title, content, image } = req.body;
        const currentPost = await Post.findById(req.params.id);

        // BUILD THE OBJECT DATA
        const data = {
            title: title || currentPost.title,
            content: content || currentPost.content,
            image: image || currentPost.image
        }

        // MODIFY POST IMAGE CONDITIONALLY
        if (req.body.image !== '') {
            const ImgId = currentPost.image.public_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }
            const newImage = await cloudinary.uploder.upload(req.body.image, {
                folder: 'posts',
                width: 1200,
                crop: 'scale'
            });

            // if get the image then set image url to the data object created before
            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
        }

        const postUpdate = await Post.findByIdAndUpdate(req.params.id, data, { new: true })

        res.status(200).json({
            success: true,
            postUpdate
        })

    } catch (error) {
        next(error);
    }
}



const addComment = async (req, res, next) => {
    const { comment } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { text: comment, postedBy: req.user._id } }
        },
            { new: true }
        )
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }
}




const addLike = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: {likes: req.user._id}
        },
            {new:true}
        )
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }
}




const removeLike = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: {likes: req.user._id}
        },
            {new:true}
        )
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }
}


module.exports = { createPost, viewPosts, viewSinglePost, deletePost, updatePost, addComment, addLike, removeLike }