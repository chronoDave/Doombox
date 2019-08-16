const mongoose = require('mongoose');

const { Schema } = mongoose;

const connectionSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  local: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Connection', connectionSchema);
