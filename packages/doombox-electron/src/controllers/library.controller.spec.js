const test = require('tape');
const LeafDB = require('leaf-db');
const path = require('path');
const fse = require('fs-extra');
const { TYPES } = require('@doombox/utils');

const LibraryController = require('./library.controller');

const root = path.resolve(__dirname, '../../../../test/songs');
const folder = path.resolve(__dirname, 'images');
const libraryFile = path.resolve(__dirname, 'library.txt');
const imageFile = path.resolve(__dirname, 'images.txt');
const image = path.resolve(folder, 'Tours-Enthusiast.png');

test('should insert songs into the database', async t => {
  const db = {
    [TYPES.DATABASE.LIBRARY]: new LeafDB({ root: __dirname, name: 'library', strict: true }),
    [TYPES.DATABASE.IMAGES]: new LeafDB({ root: __dirname, name: 'images', strict: true })
  };

  const controller = new LibraryController(db);

  try {
    await controller.create(null, { payload: root });

    const data = fse
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.strictEqual(data.length, 1, 'creates database file');
    t.ok(data[0].includes('_id'), 'writes database data');
  } catch (err) {
    t.fail(err);
  }

  fse.removeSync(libraryFile);

  t.end();
});

test('should parse covers', async t => {
  const db = {
    [TYPES.DATABASE.LIBRARY]: new LeafDB({ root: __dirname, name: 'library', strict: true }),
    [TYPES.DATABASE.IMAGES]: new LeafDB({ root: __dirname, name: 'images', strict: true })
  };

  const controller = new LibraryController(db);
  controller.folder = folder;

  fse.mkdirpSync(folder);

  try {
    await controller.create(null, { payload: root });

    // Library
    const libraryDatabase = fse
      .readFileSync(libraryFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.strictEqual(libraryDatabase.length, 1, 'creates library database file');
    t.ok(libraryDatabase[0].includes('_id'), 'writes library database data');

    // Image
    const imageDatabase = fse
      .readFileSync(imageFile, 'utf-8')
      .split('\n')
      .filter(v => v);

    t.strictEqual(imageDatabase.length, 1, 'creates image database file');
    t.ok(imageDatabase[0].includes('_id'), 'writes image database data');

    // PNG
    t.ok(fse.existsSync(image), 'creates image');
    t.strictEqual(
      fse.readFileSync(image, 'hex').slice(0, 8),
      '89504e47', // PNG magic number
      'creates valid image'
    );
  } catch (err) {
    t.fail(err);
  }

  fse.removeSync(libraryFile);
  fse.removeSync(imageFile);
  fse.removeSync(folder);

  t.end();
});
