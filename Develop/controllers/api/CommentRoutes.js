const router = require('express').Router();
const { Comment, BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
        },
        {
          model: BlogPost,
        },
      ],
    });

    // error checking
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create
router.post('/', withAuth, async (req, res) => {
  try {
    const { post, blogpost_id } = req.body;
    const commentData = await Comments.create({
      post,
      blogpost_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
    */
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete a category by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No data found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;