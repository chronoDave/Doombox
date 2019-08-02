const mongoose = require('mongoose');

const { Schema } = mongoose;

const librarySchema = new Schema({
  path: {
    type: String,
    required: true
  },
  watch: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Library', librarySchema);
