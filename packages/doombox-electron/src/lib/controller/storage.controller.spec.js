const tap = require('tap');
const { TYPE } = require('@doombox/utils');
const { assert, expect } = require('chai');
const fse = require('fs-extra');

// Core
const Storage = require('../storage');
const StorageController = require('./storage.controller');

// Utils
const { mockEvent } = require('../../../test');

tap.mochaGlobals();

context('Storage.controller', () => {
  beforeEach(() => {
    this.dir = 'storage';
    fse.mkdirpSync(this.dir);

    this.defaultValues = { test: { value: 1 } };
    this.type = TYPE.IPC.CONFIG;

    this.controller = new StorageController(
      new Storage(this.dir, 'config', this.defaultValues),
      this.type
    );
  });

  afterEach(() => {
    fse.removeSync(this.dir);
  });

  describe('validateData()', () => {
    it('Throws an error is no data is provided', () => {
      expect(this.controller.validateData).to.throw();
    });

    it('Throws an error if no id is provided', () => {
      expect(() => this.controller.validateData({})).to.throw();
    });
  });

  describe('read()', () => {
    it('Returns the config values', () => {
      const event = mockEvent((_, payload) => {
        assert.deepEqual(payload.data, this.defaultValues);
      });

      this.controller.read(event);
    });
  });

  describe('updateOne', () => {
    it('Updates the config', () => {
      const newValue = { value: 2 };
      const _id = 'test';

      const event = mockEvent((_, payload) => {
        assert.deepEqual(payload.data, { [_id]: newValue });
      });

      this.controller.updateOne(event, {
        data: { _id, update: newValue }
      });
    });
  });
});
