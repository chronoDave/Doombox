const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  language: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
