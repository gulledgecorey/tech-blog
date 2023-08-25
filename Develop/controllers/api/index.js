const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const BlogPostRoutes = require('./BlogPostRoutes');
const CommentRoutes = require('./CommentRoutes')

router.use('/user', userRoutes);
router.use('/blogpost', BlogPostRoutes);
router.use('./comment', CommentRoutes);

module.exports = router;
