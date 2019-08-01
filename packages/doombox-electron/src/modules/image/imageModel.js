const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  lastModified: {
    type: Number,
    required: true
  },
  lastModifiedDate: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', imageSchema);
