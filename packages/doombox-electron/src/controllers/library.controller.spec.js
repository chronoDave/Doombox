const test = require('ava');
const path = require('path');

const fse = require('fs-extra');
const LeafDB = require('leaf-db');

const { TYPES } = require('../../../doombox-types');

const LibraryController = require('./library.controller');

const root = path.resolve(__dirname, '../../../../test/songs');
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

test.serial('should insert songs into the database', async t => {
  const controller = setup();

  try {
    await controller.insert(null, { payload: root });

    const data = fse
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.is(data.length, 1, 'creates database file');
    t.true(data[0].includes('_id'), 'writes database data');
  } catch (err) {
    t.fail(err);
  }

  fse.removeSync(libraryFile);
  fse.removeSync(albumFile);
  fse.removeSync(labelFile);
});

test.serial('should parse covers', async t => {
  const controller = setup({ folder });

  try {
    await controller.insert(null, { payload: root });

    // Library
    const libraryDatabase = fse
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.is(libraryDatabase.length, 1, 'creates library database file');
    t.true(libraryDatabase[0].includes('_id'), 'writes library database data');

    // Image
    const imageDatabase = fse
      .readFileSync(imageFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.is(imageDatabase.length, 1, 'creates image database file');
    t.true(imageDatabase[0].includes('_id'), 'writes image database data');

    // PNG
    const image = JSON.parse(imageDatabase[0])._id;

    t.true(fse.existsSync(image), 'creates image');
    t.is(
      fse.readFileSync(image, 'hex').slice(0, 8),
      '89504e47', // PNG magic number
      'creates valid image'
    );
  } catch (err) {
    t.fail(err);
  }

  fse.removeSync(libraryFile);
  fse.removeSync(imageFile);
  fse.removeSync(albumFile);
  fse.removeSync(labelFile);
  fse.removeSync(folder);
});
