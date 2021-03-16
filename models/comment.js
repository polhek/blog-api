const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comments mongoose schema...
const CommentSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 5 },
    author: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  {
    timestamps: true,
  }
);
