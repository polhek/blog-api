const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');

/* GET home page. */
router.get('/', postController.allComments_GET);

module.exports = router;
