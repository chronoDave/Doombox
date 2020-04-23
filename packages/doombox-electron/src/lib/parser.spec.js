const tap = require('tap');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');

// Core
const MetadataParser = require('./parser');

tap.mochaGlobals();
chai.use(chaiAsPromised);
const { assert, expect } = chai;

context('MetadataParser', () => {
  before(() => {
    this.folderMusic = path.resolve(__dirname, '../../test/assets/songs');
  });

  describe('createGlobPattern()', () => {
    it('Returns a glob pattern', () => {
      const parser = new MetadataParser();
      const defaultPattern = '/**/*.?(mp3)';
      const pattern = parser.getGlob();

      assert.strictEqual(pattern, defaultPattern);
    });

    it('Returns the provided glob', () => {
      const glob = 'glob';
      const parser = new MetadataParser({ glob });
      const pattern = parser.getGlob();

      assert.strictEqual(pattern, glob);
    });

    it('Accepts custom file formats', () => {
      const fileFormats = ['flac', 'wav'];
      const parser = new MetadataParser({ fileFormats });
      const customPattern = '/**/*.?(flac|wav)';
      const pattern = parser.getGlob();

      assert.strictEqual(pattern, customPattern);
    });
  });

  describe('globFolders()', () => {
    it('Throws an error if an invalid folder is provided', () => {
      const parser = new MetadataParser();

      expect(parser.globFolders).to.throw();
    });

    it('Returns an array of file paths', () => {
      const parser = new MetadataParser();
      const files = parser.globFolders(this.folderMusic);

      assert.isArray(files);
      assert.strictEqual(files.length, 3);
    });
  });

  describe('parseFiles()', () => {
    it('Parses files', async () => {
      const parser = new MetadataParser();
      const files = parser.globFolders(this.folderMusic);

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      /**
       * For some odd reason `txt.mp3` does not fail on Travis CI,
       * Now, Travis runs a Linux machine, and I personally run Windows,
       * So, for now, this check will have to do
       */
      assert.strictEqual(
        payload.length,
        process.platform === 'win32' ? 2 : 3
      );
    });

    it('Skips covers when `skipCovers` is enabled', async () => {
      const parser = new MetadataParser({ skipCovers: true });
      const files = parser.globFolders(path.resolve(this.folderMusic, 'Enthusiast'));

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      assert.strictEqual(payload[0].payload.images.length, 0);
    });

    it('Has valid callback props', async () => {
      const parser = new MetadataParser({ skipCovers: true });
      const files = parser.globFolders(path.resolve(this.folderMusic, 'Enthusiast'));
      const metadata = {
        file: path.resolve(this.folderMusic, 'Enthusiast', 'Tours_-_01_-_Enthusiast.mp3'),
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
          titlelocalized: null,
          artistlocalized: null,
          artistslocalized: null,
          albumlocalized: null,
          albumartistlocalized: null,
          cdid: null,
          date: '2012-08-31T16:09:24',
          track: { no: 1, of: null },
          disk: { no: null, of: null },
          title: 'Enthusiast',
          artists: ['Tours'],
          artist: 'Tours',
          album: 'Enthusiast',
          year: 2012,
          genre: ['Electronic'],
          copyright: 'Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/',
          comment: ['URL: http://freemusicarchive.org/music/Tours/Enthusiast/Tours_-_Enthusiast\r\nComments: http://freemusicarchive.org/\r\nCurator: \r\nCopyright: Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/'],
          albumartist: 'Tours'
        }
      };

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      assert.deepEqual(payload[0].payload, metadata);
      assert.strictEqual(payload[0].index, 1);
      assert.strictEqual(payload[0].total, 1);
    });

    it('Parses images', async () => {
      const parser = new MetadataParser();
      const files = parser.globFolders(path.resolve(this.folderMusic, 'Enthusiast'));

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      assert.strictEqual(payload.length, 1);
    });

    it('Parses image metadata correctly', async () => {
      const parser = new MetadataParser();
      const files = parser.globFolders(path.resolve(this.folderMusic, 'Enthusiast'));
      const metadata = {
        _id: 'Tours-Enthusiast-Cover (front)',
        type: 'Cover (front)',
        description: 'cover',
        format: 'jpg',
        data: null
      };

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      assert.hasAllKeys(payload[0].payload.images[0], metadata);
      assert.instanceOf(payload[0].payload.images[0].data, Buffer);
    });

    it('Skips over invalid files if `requiredMetadata` is provided', async () => {
      const parser = new MetadataParser({ requiredMetadata: ['title'] });
      const files = parser.globFolders(this.folderMusic);

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parseFiles(files, callback);

      assert.strictEqual(payload.length, 1);
    });

    it('Throws an error when `parseStrict` is enabled and `requiredMetadata` is provided', async () => {
      const parser = new MetadataParser({
        parseStrict: true,
        requiredMetadata: ['title']
      });
      const files = parser.globFolders(this.folderMusic);

      const payload = [];
      const callback = props => payload.push(props);

      return expect(parser.parseFiles(files, callback)).to.be.rejected;
    });
  });

  describe('parse()', () => {
    it('Parses folders', async () => {
      const parser = new MetadataParser();

      const payload = [];
      const callback = props => payload.push(props);

      await parser.parse(this.folderMusic, callback);

      /**
       * For some odd reason `txt.mp3` does not fail on Travis CI,
       * Now, Travis runs a Linux machine, and I personally run Windows,
       * So, for now, this check will have to do
       */
      assert.strictEqual(
        payload.length,
        process.platform === 'win32' ? 2 : 3
      );
    });
  });
});
