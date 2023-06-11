const cloudinary = require('../utils/cloudinary');
const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');



const createPost = async (req, res, next) => {
    const { post } = req.body;


    // console.log(post)
    const { title, content } = JSON.parse(post);

    // console.log(req.body, req.files, 10)

    const image = req.files.image

    // return res.send({data:"created"});
    try {
        // UPLOAD IMAGE IN CLOUDINARY
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
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
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


// const createUser = async (req, res) => {

//     const { user } = req.body;
//     const userData = JSON.parse(user);

//     let profileImgResponse;

//     if (req.files && req.files.profileImg) {


//         const profileImg = req.files.profileImg;

//         profileImgResponse = await cloudinary.uploader.upload(profileImg.tempFilePath, {
//             upload_preset: 'task-tracker',
//             folder: 'task-tracker/profile-img',
//             transformation: [
//                 { width: 1000, crop: "scale" },
//                 { quality: 67 }
//             ]
//         });

//         console.log(profileImgResponse, "profileImgResponse 14 userController.js");
//     }

//     const newUserData = {
//         ...userData,
//     };

//     if (profileImgResponse) {
//         newUserData.profileImg = profileImgResponse.secure_url;
//     }

//     try {
//         const userDetail = await User.create(newUserData);
//         res.status(200).json(userDetail);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// }


const viewPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name image');
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}


const viewSinglePost = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id).populate('postedBy comments.postedBy', 'name image');
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}




const deletePost = async (req, res, next) => {
    const currentPost = await Post.findById(req.params.id);

    //delete post image in cloudinary       
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }

    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "post deleted"
        })

    } catch (error) {
        next(error);
    }

}



const updatePost = async (req, res, next) => {
    try {
        const { post } = req.body;
        const { title, content } = JSON.parse(post);
        const image = req.files.image

        const currentPost = await Post.findById(req.params.id);

        // BUILD THE OBJECT DATA
        const data = {
            title: title || currentPost.title,
            content: content || currentPost.content,
            image: image || currentPost.image
        }

        // MODIFY POST IMAGE CONDITIONALLY
        if (req.files.image !== '') {
            const ImgId = currentPost.image.public_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }
            const newImage = await cloudinary.uploder.upload(req.files.image.tempFilePath, {
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
        console.log(error);
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




//add like
const addLike = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.user._id }
        },
            { new: true }
        );
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
        main.io.emit('add-like', posts);

        res.status(200).json({
            success: true,
            post,
            posts
        })

    } catch (error) {
        next(error);
    }

}




const removeLike = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id }
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


module.exports = { createPost, viewPosts, viewSinglePost, deletePost, updatePost, addComment, addLike, removeLike }