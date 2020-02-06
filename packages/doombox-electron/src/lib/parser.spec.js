const tap = require('tap');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');

// Core
const MetadataParser = require('./parser');
const NeDB = require('./database/nedb');

// Utils
const { COLLECTION } = require('../utils/const');

tap.mochaGlobals();
chai.use(chaiAsPromised);
const { assert, expect } = chai;

context('MetadataParser', () => {
  before(() => {
    this.folderMusic = path.resolve(__dirname, '../../test/assets/songs');
  });

  describe('createGlobPattern()', () => {
    it('Returns a glob pattern', () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));
      const defaultPattern = '/**/*.?(mp3)';
      const pattern = parser.createGlobPattern();

      assert.strictEqual(pattern, defaultPattern);
    });

    it('Returns the provided glob', () => {
      const glob = 'glob';
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG), { glob });
      const pattern = parser.createGlobPattern();

      assert.strictEqual(pattern, glob);
    });

    it('Accepts custom file formats', () => {
      const fileFormats = ['flac', 'wav'];
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG), { fileFormats });
      const customPattern = '/**/*.?(flac|wav)';
      const pattern = parser.createGlobPattern();

      assert.strictEqual(pattern, customPattern);
    });
  });

  describe('globFolders()', () => {
    it('Throws an error if an invalid folder is provided', () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));

      expect(parser.globFolders).to.throw();
    });

    it('Returns an array of file paths', () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));
      const files = parser.globFolders(this.folderMusic);

      assert.isArray(files);
      assert.strictEqual(files.length, 3);
    });
  });

  describe('parse()', () => {
    it('Parses folders', async () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));
      const docs = await parser.parse(this.folderMusic);

      assert.strictEqual(docs.length, 1);
    });

    it('Parses images', async () => {
      const dir = tap.testdir({});
      const db = new NeDB([COLLECTION.SONG, COLLECTION.IMAGE]);
      const parser = new MetadataParser(db, { pathImage: dir });
      await parser.parse(this.folderMusic);
      const docs = await db.read(COLLECTION.IMAGE);

      assert.strictEqual(docs.length, 1);
    });

    it('Parses metadata correctly', async () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));
      const docs = await parser.parse([path.resolve(this.folderMusic, 'Enthusiast')]);
      const payload = {
        images: [],
        format: {
          tagTypes: ['ID3v2.4'],
          lossless: false,
          container: 'MPEG',
          codec: 'MPEG 1 Layer 3',
          sampleRate: 44100,
          numberOfChannels: 2,
          bitrate: 320000,
          codecProfile: 'CBR',
          tool: 'LAME3.98r',
          duration: 171.04979591836735
        },
        metadata: {
          track: { no: 1, of: null },
          disk: { no: null, of: null },
          title: 'Enthusiast',
          artists: ['Tours'],
          artist: 'Tours',
          album: 'Enthusiast',
          year: 2012,
          date: '2012-08-31T16:09:24',
          genre: ['Electronic'],
          copyright: 'Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/',
          comment: ['URL: http://freemusicarchive.org/music/Tours/Enthusiast/Tours_-_Enthusiast\r\nComments: http://freemusicarchive.org/\r\nCurator: \r\nCopyright: Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/'],
          albumartist: 'Tours'
        }
      };

      assert.containsAllDeepKeys(docs[0], payload);
    });

    it('Parses image metadata correctly', async () => {
      const dir = tap.testdir({});
      const db = new NeDB([COLLECTION.SONG, COLLECTION.IMAGE]);
      const parser = new MetadataParser(db, { pathImage: dir });
      await parser.parse(this.folderMusic);
      const payload = {
        _id: 'Tours-Enthusiast-Cover (front)',
        picture: 'Cover (front)',
        description: 'cover'
      };
      const docs = await db.read(COLLECTION.IMAGE);

      assert.containsAllKeys(docs[0], payload);
    });

    it('Fires a callback on each scan', async () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG));
      let index = 0;
      const callback = () => { index += 1; };
      await parser.parse(this.folderMusic, callback);

      assert.strictEqual(index, 1);
    });

    it('Skip covers when `skipCovers` is enabled', async () => {
      const dir = tap.testdir({});
      const db = new NeDB([COLLECTION.SONG, COLLECTION.IMAGE]);
      const parser = new MetadataParser(db, {
        pathImage: dir,
        skipCovers: true
      });
      await parser.parse(this.folderMusic);
      const docs = await db.read(COLLECTION.IMAGE);

      assert.strictEqual(docs.length, 0);
    });

    it('Throws an error when `parseStrict` is enabled', async () => {
      const parser = new MetadataParser(new NeDB(COLLECTION.SONG), { parseStrict: true });

      return expect(parser.parse(this.folderMusic)).to.be.rejected;
    });
  });
});
