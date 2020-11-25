const LibraryController = require('./library/library.controller');
const StorageController = require('./storage.controller');
const SongController = require('./song.controller');
const ImageController = require('./image.controller');
const LabelController = require('./label.controller');
const AlbumController = require('./album.controller');

module.exports = {
  LibraryController,
  SongController,
  StorageController,
  ImageController,
  LabelController,
  AlbumController
};
