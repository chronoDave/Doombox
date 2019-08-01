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
  },
  background: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  database: {
    type: String,
    required: true
  },
  folders: [{
    path: {
      type: String,
      required: true
    },
    watch: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('User', userSchema);
