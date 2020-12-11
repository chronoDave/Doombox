const fs = require('fs');
const path = require('path');

const LeafDB = require('leaf-db').default;

const { TYPES } = require('../../../../utils/types');

const LibraryController = require('../library.controller');

const songFile = path.resolve(__dirname, 'songs.txt');
const labelFile = path.resolve(__dirname, 'labels.txt');
const albumFile = path.resolve(__dirname, 'albums.txt');
const imageFile = path.resolve(__dirname, 'images.txt');

const songFolder = path.resolve(__dirname, '../../../../../test/songs');
const imageFolder = path.resolve(__dirname, 'images');

const setup = (options = {}) => new LibraryController({
  [TYPES.DATABASE.SONGS]: new LeafDB(TYPES.DATABASE.SONGS, { root: __dirname, strict: !!options.strict }),
  [TYPES.DATABASE.IMAGES]: new LeafDB(TYPES.DATABASE.IMAGES, { root: __dirname, strict: !!options.strict }),
  [TYPES.DATABASE.LABELS]: new LeafDB(TYPES.DATABASE.LABELS, { root: __dirname, strict: !!options.strict }),
  [TYPES.DATABASE.ALBUMS]: new LeafDB(TYPES.DATABASE.ALBUMS, { root: __dirname, strict: !!options.strict })
}, options);

const cleanup = () => {
  fs.unlinkSync(songFile);
  fs.unlinkSync(albumFile);
  fs.unlinkSync(labelFile);
  fs.unlinkSync(imageFile);
  fs.rmdirSync(imageFolder, { recursive: true });
};

module.exports = {
  setup,
  cleanup,
  imageFile,
  songFile,
  albumFile,
  labelFile,
  songFolder,
  imageFolder
};