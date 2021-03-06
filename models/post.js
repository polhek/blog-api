const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post mongoose schema...
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PostSchema.virtual('url').get(function () {
  return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
