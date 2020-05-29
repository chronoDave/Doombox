const { assert } = require('chai');
const LeafDB = require('leaf-db');
const path = require('path');
const fse = require('fs-extra');
const { TYPES } = require('@doombox/utils');

const LibraryController = require('./library.controller');

describe('LibraryController', () => {
  describe('create()', () => {
    beforeEach(() => {
      this.root = path.resolve(__dirname, '../../test/songs');
      this.imageFolder = path.resolve(__dirname, 'images');

      this.libraryFile = path.resolve(__dirname, 'library.txt');
      this.imageFile = path.resolve(__dirname, 'images.txt');

      this.db = {
        [TYPES.DATABASE.LIBRARY]: new LeafDB({ root: __dirname, name: 'library', strict: true }),
        [TYPES.DATABASE.IMAGES]: new LeafDB({ root: __dirname, name: 'images', strict: true })
      };

      this.controller = new LibraryController(this.db);
    });

    afterEach(() => {
      fse.removeSync(this.libraryFile);
      fse.removeSync(this.imageFile);
      fse.removeSync(this.imageFolder);
    });

    it('Should insert songs into the database', async () => {
      try {
        await this.controller.create(null, { payload: this.root });

        const data = fse
          .readFileSync(this.libraryFile, 'utf-8')
          .split('\n')
          .filter(value => value);

        assert.strictEqual(data.length, 1);
        assert.include(data[0], '_id');
      } catch (err) {
        assert.fail(err);
      }
    });

    it('Should parse covers', async () => {
      const image = path.resolve(this.imageFolder, 'Tours-Enthusiast.png');

      fse.mkdirpSync(this.imageFolder);

      this.controller.folder = this.imageFolder;

      try {
        await this.controller.create(null, { payload: this.root });

        // Library
        const libraryDatabase = fse
          .readFileSync(this.libraryFile, 'utf-8')
          .split('\n')
          .filter(value => value);
        assert.strictEqual(libraryDatabase.length, 1);
        assert.include(libraryDatabase[0], '_id');

        // Image
        const imageDatabase = fse
          .readFileSync(this.imageFile, 'utf-8')
          .split('\n')
          .filter(value => value);
        assert.strictEqual(imageDatabase.length, 1);
        assert.include(imageDatabase[0], '_id');

        // PNG
        assert.isTrue(fse.existsSync(image));
        assert.strictEqual(fse.readFileSync(image, 'hex').slice(0, 8), '89504e47'); // PNG magic number
      } catch (err) {
        assert.fail(err);
      }
    });
  });
});
