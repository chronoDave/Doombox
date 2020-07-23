const tap = require('tap');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');

// Core
const MetadataParser = require('./parser');

tap.mochaGlobals();
chai.use(chaiAsPromised);

const { assert, expect } = chai;
const folder = path.resolve(__dirname, '../../../test/assets/songs');

context('MetadataParser', () => {
  beforeEach(() => {
    this.parser = new MetadataParser();
  });

  describe('parseFile()', () => {
    it('Throws an error if a corrupted file is passed', () => {
      const file = path.resolve(__dirname, '../../../test/assets/songs/Directionless EP/txt.mp3');
      return expect(this.parser.parseFile(file)).to.be.rejected;
    });
  });

  describe('parse()', () => {
    it('Throw an error if no folders are provided', () => (
      expect(this.parser.parse()).to.be.rejected
    ));

    it('Throws an error if no valid files are found', () => (
      expect(this.parser.parse(__dirname)).to.be.rejected
    ));

    it('Throws an error if strict mode is enabled and invalid metadata is provided', () => {
      this.parser.strict = true;

      return expect(this.parser.parse(folder, () => null)).to.be.rejected;
    });

    it('Parses files', async () => {
      const stack = [];
      const validFile = path.resolve(__dirname, '../../../test/assets/songs/Enthusiast/Tours_-_01_-_Enthusiast');

      await this.parser.parse(folder, payload => stack.push(payload));

      assert.strictEqual(stack.length, 1);
      assert.strictEqual(stack[0].file, `${validFile}.mp3`);
    });

    it('Does not parse files if files do not meet metadata requirements', async () => {
      this.parser.requiredMetadata = ['spec'];
      const stack = [];

      await this.parser.parse(folder, payload => stack.push(payload));

      assert.strictEqual(stack.length, 0);
    });
  });
});
