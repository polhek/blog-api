const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createNewComment_POST = (req, res) => {
  const { text, author, postID } = req.body;

  const newComment = new Comment({
    text,
    author,
    post: postID,
  });

  newComment
    .save()
    .then((comment) => {
      Post.findByIdAndUpdate(
        postID,
        { $push: { comments: comment._id } },
        { new: true, useFindAndModify: false },
        (err, post) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err.message });
          }
          res.status(200).json({ success: true, comment });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: err.message });
    });
};

exports.deleteComment_DELETE = async (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
    if (err) {
      return res.status(409).json({ success: false, msg: err.message });
    } else {
      Post.findByIdAndUpdate(
        deletedComment.post,
        {
          $pull: { comments: deletedComment._id },
        },
        { new: true, useFindAndModify: false },
        (err, post) => {
          if (err) {
            return res.status(409).json({ success: false, msg: err.message });
          }
          res.status(200).json({
            success: true,
            msg: 'Comment deleted!',
            comment: deletedComment,
            post,
          });
        }
      );
    }
  });
};
