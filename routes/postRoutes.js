/* ================================================================================
/routes/postRoutes.js - Post and Comment Routes
================================================================================
This file defines all API endpoints related to blog posts. It uses chaining
(`router.route()`) for cleaner definitions of endpoints that handle multiple
HTTP methods (like GET and POST on the same URL). It also strategically applies
the `authMiddleware` to protect routes that require a user to be logged in.
*/
const express = require('express');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addCommentToPost
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for the main posts collection (/api/posts)
router.route('/')
    .get(getAllPosts) // Anyone can get all posts
    .post(authMiddleware, createPost); // Only authenticated users can create a post

// Routes for a specific post by its ID (/api/posts/:id)
router.route('/:id')
    .get(getPostById) // Anyone can get a single post
    .put(authMiddleware, updatePost) // Only authenticated users can update
    .delete(authMiddleware, deletePost); // Only authenticated users can delete

// Route for adding a comment to a specific post (/api/posts/:postId/comments)
// Note: This is a nested route for better organization
router.route('/:postId/comments')
    .post(authMiddleware, addCommentToPost); // Only authenticated users can comment

module.exports = router;