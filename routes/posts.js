const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');
const passport = require('passport');
/* GET home page. */
router.get('/', postController.allPosts_GET);

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  postController.newPost_POST
);

router.get('/:id', postController.getSpecifiedPost_GET);

router.put(
  '/:id/update',
  passport.authenticate('jwt', { session: false }),
  postController.editSpecifiedPost_PUT
);

router.delete(
  '/:id/delete',
  passport.authenticate('jwt', { session: false }),
  postController.deleteSpecifiedPost_DELETE
);

module.exports = router;
