const tap = require('tap');
const { assert, expect } = require('chai');
const fse = require('fs-extra');

// Core
const Logger = require('./log');

tap.mochaGlobals();

context('Logger', () => {
  beforeEach(() => {
    this.dir = 'log';
    this.log = new Logger(this.dir);
  });

  afterEach(() => {
    fse.removeSync(this.dir);
  });

  describe('errToJson()', () => {
    it('Throws an error if no error is provided', () => {
      expect(this.log.errToJson).to.throw();
    });

    it('Throws an error if an invalid error type is provided', () => {
      expect(() => this.log.errToJson('This is an error')).to.throw();
    });

    it('Converts an error to valid JSON', () => {
      const errMessage = 'This is an error';
      const err = new Error(errMessage);

      const errJson = this.log.errToJson(err);

      assert.isString(errJson);
      assert.isTrue(errJson.includes(errMessage));
    });
  });

  describe('createLog()', () => {
    it('Throws an error if no content is provided', () => {
      expect(this.log.createLog).to.throw();
    });

    it('Throws an error if invalid content is provided', () => {
      expect(() => this.log.createLog(10)).to.throw();
    });

    it('Creates a log file', () => {
      this.log.createLog('This is a log file');

      const files = fse.readdirSync(this.dir);

      assert.strictEqual(files.length, 1);
    });
  });

  describe('createLogError()', () => {
    it('Creates a log file', () => {
      const err = new Error('This is a log file');
      this.log.createLogError(err);

      const files = fse.readdirSync(this.dir);

      assert.strictEqual(files.length, 1);
    });
  });
});
