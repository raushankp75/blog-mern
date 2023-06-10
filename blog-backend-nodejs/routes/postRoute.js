const express = require('express');
const router = express.Router();


// import controller
const { createPost, viewPosts, viewSinglePost, deletePost, updatePost, addComment, addLike, removeLike } = require('../controllers/postController');


// import authentication middleware
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// blog post routes
router.post('/post/create', isAuthenticated, createPost);
router.get('/posts/view', viewPosts);
router.get('/post/:id', viewSinglePost);
router.delete('/delete/post/:id', isAuthenticated, deletePost);
router.put('/update/post/:id', isAuthenticated, updatePost);
router.put('/comment/post/:id', isAuthenticated, addComment);
router.put('/addlike/post/:id', isAuthenticated, addLike);
router.put('/removelike/post/:id', isAuthenticated, removeLike);




module.exports = router;