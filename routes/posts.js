const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');

/* GET home page. */
router.get('/', postController.allPosts_GET);

//! Needs to be protected route, only admin can create new post...
router.post('/create', postController.newPost_POST);

router.get('/:id', postController.getSpecifiedPost_GET);

router.put('/:id/update', postController.editSpecifiedPost_PUT);

router.delete('/:id/delete', postController.deleteSpecifiedPost_DELETE);

module.exports = router;
