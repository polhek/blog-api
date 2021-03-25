const Post = require('../models/post');
const async = require('async');
const post = require('../models/post');
const Comment = require('../models/comment');

exports.allPosts_GET = (req, res) => {
  Post.find()
    .populate('author', '-password')
    .populate('comments')
    .sort('-createdAt')
    .exec((err, posts) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err.message });
      } else if (posts.length === 0) {
        return res.status(404).json({
          success: false,
          msg: 'No posts find in the database!',
        });
      }
      res.status(200).json({ success: true, posts: posts });
    });
};

exports.newPost_POST = (req, res, next) => {
  const { title, text, userID } = req.body;

  const newPost = new Post({
    title: title,
    text: text,
    author: userID,
  });

  newPost
    .save()
    .then((post) => {
      res.status(200).json({ success: true, post });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.getSpecifiedPost_GET = (req, res, next) => {
  Post.findById(req.params.id)
    .populate('author')
    .exec(function (err, post) {
      if (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
      if (post == null) {
        const err = new Error('Book copy not found');
        return res.status(404).json({ success: false, msg: err.message });
      }
      return res.status(200).json({ success: true, post: post });
    });
};

exports.editSpecifiedPost_PUT = (req, res, next) => {
  const { title, text, userID, status } = req.body;

  const updatedPost = new Post({
    title: title,
    text: text,
    author: userID,
    status: status,
    _id: req.params.id,
  });

  Post.findByIdAndUpdate(
    req.params.id,
    updatedPost,
    { useFindAndModify: false, new: true },
    function (err, theupdatedpost) {
      if (err) {
        return res.status(400).json({ success: false, msg: err.message });
      }
      theupdatedpost.populate('author', (err, popPost) => {
        if (err) return next(err);

        return res.status(200).json({
          success: true,
          msg: 'Successfuly updated blog post',
          post: popPost,
        });
      });
    }
  );
};

//? S
exports.deleteSpecifiedPost_DELETE = (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(409).json({ success: false, msg: err.message });
    } else {
      res.status(200).json({
        success: true,
        msg: 'Post deleted!',
        post: deletedPost,
      });
    }
  });
};
