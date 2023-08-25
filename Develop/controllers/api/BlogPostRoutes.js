const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');

const withAuth = require('../../utils/auth');
router.get('/', withAuth, async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    // error checking
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route
router.post('/', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.create(req.body);
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET route
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    // error checking for BlogPost
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog was not found.' });
    }

    //return songPost
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: 'error' });
  }
});

module.exports = router;
