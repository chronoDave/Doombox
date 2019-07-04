const mongoose = require('mongoose');

module.exports = {
  Song: mongoose.model('Song', {
    title: String
  })
};
