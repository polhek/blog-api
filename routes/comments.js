const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a user');
});

router.post('/create', commentsController.createNewComment_POST);

router.delete(
  '/:id/delete',
  passport.authenticate('jwt', { session: false }),
  commentsController.deleteComment_DELETE
);

module.exports = router;
