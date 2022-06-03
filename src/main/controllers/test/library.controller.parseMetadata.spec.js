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
  const file = path.resolve(songFolder, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

  try {
    const metadata = await controller.parseMetadata(file);

    t.equal(typeof metadata._albumId, 'string', '_albumId');
    t.equal(typeof metadata._labelId, 'string', '_labelId');
    t.equal(metadata.file, file, 'file');
    t.equal(typeof metadata.duration, 'number', 'duration');
    t.equal(metadata.artist, 'Tours', 'artist');
    t.equal(metadata.title, 'Enthusiast', 'title');
    t.equal(metadata.album, 'Enthusiast', 'album');
    t.equal(metadata.albumartist, 'Tours', 'albumartist');
    t.deepEqual(metadata.track, [1, 1], 'track');
    t.deepEqual(metadata.disc, [1, 1], 'disc');
    t.equal(metadata.year, 2012, 'year');
    t.equal(metadata.artistlocalized, 'Tours', 'artistlocalized');
    t.equal(metadata.titlelocalized, 'Enthusiast', 'titlelocalized');
    t.equal(metadata.albumlocalized, 'Enthusiast', 'albumlocalized');
    t.equal(metadata.albumartistlocalized, 'Tours', 'albumartistlocalized');
    t.equal(metadata.date, '2012-08-31', 'date');
    t.false(metadata.event, 'event');
    t.equal(metadata.genre, 'Electronic', 'genre');
    t.equal(metadata.cdid, 'TEST-001', 'cdid');
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('[library.controller.parseMetadata] should parse images if `skipCovers` is false', async t => {
  const controller = setup(imageFolder);
  const file = path.resolve(songFolder, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

  try {
    const metadata = await controller.parseMetadata(file);

    t.true(Array.isArray(metadata.images), 'images is array');
    t.equal(metadata.images.length, 1, 'images length is 1');
    t.equal(metadata.images[0].format, 'png', 'format equals png');
    t.false(metadata.images[0].description, 'does not have description');
    t.equal(metadata.images[0].type, 'Cover (front)', 'type equals Cover (front)');
    t.true(Buffer.isBuffer(metadata.images[0].data), 'data equals buffer');
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
