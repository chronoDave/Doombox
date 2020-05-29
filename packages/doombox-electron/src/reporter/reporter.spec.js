const { assert } = require('chai');
const path = require('path');
const fse = require('fs-extra');

const Reporter = require('./reporter');

describe('Reporter', () => {
  beforeEach(() => {
    this.root = path.resolve(__dirname, 'test');
    this.reporter = new Reporter(this.root);
  });

  afterEach(() => {
    fse.removeSync(this.root);
  });

  it('Should create a log file', () => {
    fse.mkdirpSync(this.root);

    const text = 'This is a test';

    this.reporter.log(text, 'chai', 'MOCHA');

    const files = fse.readdirSync(this.root);

    assert.strictEqual(files.length, 1);
    assert.include(files[0], 'chai');
    assert.include(files[0], 'MOCHA');

    const file = fse.readFileSync(path.resolve(this.root, files[0]), 'utf-8');

    assert.strictEqual(file, text);
  });

  it('should create error log file', () => {
    fse.mkdirpSync(this.root);

    const error = new Error('This is an error');

    this.reporter.logError(error);

    const files = fse.readdirSync(this.root);

    assert.strictEqual(files.length, 1);

    const file = fse.readFileSync(path.resolve(this.root, files[0]), 'utf-8');

    assert.include(file, error.message);
    assert.include(file, error.stack);
  });
});
