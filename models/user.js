const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User mongoose schema...
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
