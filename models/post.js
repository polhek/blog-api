const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post mongoose schema...
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
