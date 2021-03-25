const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a user');
});

router.post('/create', commentsController.createNewComment_POST);

router.delete('/:id/delete', commentsController.deleteComment_DELETE);

module.exports = router;
