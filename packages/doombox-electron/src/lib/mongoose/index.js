const mongoose = require('mongoose');
const { Song } = require('./models');

module.exports = {
  connect: () => {
    mongoose.connect('mongodb://localhost:32768/doombox', { useNewUrlParser: true });
  },
  add: () => {
    const coolNewSong = new Song({ title: 'A nice song' });
    coolNewSong.save().then(() => console.log('Song has been saved'));
  }
};
