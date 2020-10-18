const test = require('tape');
const path = require('path');
const fs = require('fs');

const LeafDB = require('leaf-db');

const { TYPES } = require('../../utils/types');
const { createMockEvent } = require('../../../test/mock');

const LibraryController = require('./library.controller');

const root = path.resolve(__dirname, '../../../test/songs');
const folder = path.resolve(__dirname, 'images');

const libraryFile = path.resolve(__dirname, 'library.txt');
const labelFile = path.resolve(__dirname, 'labels.txt');
const albumFile = path.resolve(__dirname, 'albums.txt');
const imageFile = path.resolve(__dirname, 'images.txt');

const setup = (options = {}) => {
  const db = {
    [TYPES.DATABASE.LIBRARY]: new LeafDB(TYPES.DATABASE.LIBRARY, { root: __dirname, strict: true }),
    [TYPES.DATABASE.IMAGES]: new LeafDB(TYPES.DATABASE.IMAGES, { root: __dirname, strict: true }),
    [TYPES.DATABASE.LABELS]: new LeafDB(TYPES.DATABASE.LABELS, { root: __dirname, strict: true }),
    [TYPES.DATABASE.ALBUMS]: new LeafDB(TYPES.DATABASE.ALBUMS, { root: __dirname, strict: true })
  };
  const controller = new LibraryController(db, options);

  return controller;
};

const cleanup = () => {
  fs.unlinkSync(libraryFile);
  fs.unlinkSync(albumFile);
  fs.unlinkSync(labelFile);
  fs.unlinkSync(imageFile);
  fs.rmdirSync(folder, { recursive: true });
};

test('should insert songs into the database', async t => {
  const controller = setup();
  const mockEvent = createMockEvent();

  try {
    await controller.insert(mockEvent, { payload: root });

    const data = fs
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.equal(mockEvent.sender.send.callCount, 1);
    t.equal(data.length, 1, 'creates database file');
    t.true(data[0].includes('_id'), 'writes database data');
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});

test('should parse covers', async t => {
  const controller = setup({ folder });
  const mockEvent = createMockEvent();

  try {
    await controller.insert(mockEvent, { payload: root });

    // Library
    const libraryDatabase = fs
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.equal(libraryDatabase.length, 1, 'creates library database file');
    t.true(libraryDatabase[0].includes('_id'), 'writes library database data');

    // Image
    const imageDatabase = fs
      .readFileSync(imageFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.equal(imageDatabase.length, 1, 'creates image database file');
    t.true(imageDatabase[0].includes('_id'), 'writes image database data');

    // PNG
    const image = JSON.parse(imageDatabase[0]).file;

    t.true(fs.existsSync(image), 'creates image');
    t.is(
      fs.readFileSync(image, 'hex').slice(0, 8),
      '89504e47', // PNG magic number
      'creates valid image'
    );
  } catch (err) {
    t.fail(err);
  }

  cleanup();

  t.end();
});
