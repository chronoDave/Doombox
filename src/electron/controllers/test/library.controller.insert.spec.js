const test = require('tape');
const fs = require('fs');
const { TYPES } = require('@doombox-utils/types');

const { createMockElectronEvent } = require('./mock');
const {
  setup,
  cleanup,
  imageFolder,
  songFolder: payload,
  songFile,
  albumFile,
  labelFile,
  imageFile
} = require('./_utils');

test('[library.controller.insert] should create library', async t => {
  const controller = setup(imageFolder);
  const mockEvent = createMockElectronEvent();

  try {
    const data = await controller.insert(mockEvent, { payload });

    t.equal(data.images.length, 1, 'has images');
    t.equal(data.songs.length, 1, 'has images');
    t.equal(data.albums.length, 1, 'has images');
    t.equal(data.labels.length, 1, 'has images');
    t.equal(
      mockEvent.sender.send.callCount,
      3,
      'calls interrupt'
    );
    t.equal(
      fs.readFileSync(songFile, 'utf-8').split('\n').length,
      1,
      'persists song data'
    );
    t.equal(
      fs.readFileSync(albumFile, 'utf-8').split('\n').length,
      1,
      'persists album data'
    );
    t.equal(
      fs.readFileSync(labelFile, 'utf-8').split('\n').length,
      1,
      'persists label data'
    );
    t.equal(
      fs.readFileSync(imageFile, 'utf-8').split('\n').length,
      1,
      'persists image data'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('[library.controller.insert] should create images', async t => {
  const controller = setup(imageFolder);
  const mockEvent = createMockElectronEvent();

  try {
    await controller.insert(mockEvent, { payload });

    const songs = await controller.db[TYPES.DATABASE.SONGS].find();
    const images = await controller.db[TYPES.DATABASE.IMAGES].findById(songs[0].images[0]);

    t.true(
      fs.existsSync(images[0].files.original),
      'creates image'
    );
    t.true(
      fs.existsSync(images[0].files.thumbnail),
      'creates thumbnail'
    );
    t.equal(
      fs.readFileSync(images[0].files.original, 'hex').slice(0, 8),
      'ffd8ffdb', // JPG magic number
      'creates valid image'
    );
    t.equal(
      fs.readFileSync(images[0].files.thumbnail, 'hex').slice(0, 8),
      'ffd8ffdb', // JPG magic number
      'creates valid thumbnail'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
