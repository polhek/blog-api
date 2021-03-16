const Post = require('../models/post');
const async = require('async');

exports.allComments_GET = (req, res, next) => {
  Post.find()
    .populate('author')
    .sort('-createdAt')
    .exec((err, posts) => {
      if (err) {
        return res.json(err);
      } else if (posts.length === 0) {
        return res.json('No posts are in database!');
      }
      res.json(posts);
    });
};
