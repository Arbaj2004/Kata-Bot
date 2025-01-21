const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/featured-blog', blogController.getFeaturedBlog);
router.get('/:id', blogController.getBlogById);

router.use(authController.restrictTo('Admin'));
router.post('/', blogController.createBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
