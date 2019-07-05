const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  file_name: {
    type: String,
    required: true
  },
  file_type: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', imageSchema);
