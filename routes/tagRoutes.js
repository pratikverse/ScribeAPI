const express = require('express');
const { getAllTags, getPostsByTagName } = require('../controllers/tagController');
const router = express.Router();

// Route to get a list of all tags
router.get('/', getAllTags);

// Route to get all posts that have a specific tag
router.get('/:name/posts', getPostsByTagName);

module.exports = router;