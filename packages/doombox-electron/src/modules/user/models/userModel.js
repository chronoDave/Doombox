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
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'Connection'
  }],
  library: [{
    type: Schema.Types.ObjectId,
    ref: 'Library'
  }]
});

module.exports = mongoose.model('User', userSchema);
