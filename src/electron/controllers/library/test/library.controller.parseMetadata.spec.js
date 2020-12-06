const test = require('tape');
const path = require('path');

const {
  setup,
  cleanup,
  imageFolder,
  songFolder
} = require('./_utils');

test('[library.controller.parseMetadata] should parse metadata', async t => {
  const controller = setup();
  const validSong = path.resolve(songFolder, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

  try {
    const metadata = await controller.parseMetadata(validSong);

    t.true(metadata._albumId, 'has `_albumId`');
    t.true(metadata._labelId, 'has `_labelId`');
    t.true(metadata.file, 'has `file`');
    t.true(metadata.metadata, 'has `metadata`');
    t.equal(metadata.metadata.cdid, null, 'has `cdid`');
    t.true(Array.isArray(metadata.images), '`images` is an array');
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('[library.controller.parseMetadata] should parse covers if `skipCovers` is false', async t => {
  const controller = setup({ folder: imageFolder });
  const validSong = path.resolve(songFolder, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

  try {
    const metadata = await controller.parseMetadata(validSong);

    t.true(metadata.images.length > 0, 'has `images`');
    t.true(metadata.images[0]._id, 'image has `_id`');
    t.true(metadata.images[0].format, 'image has `format`');
    t.true(metadata.images[0].data, 'image has `data`');
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
