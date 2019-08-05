import { assert } from 'chai';

import {
  isEmptyObj,
  normalizeUrl,
  getRandomInt
} from '../src/utils';

describe('[utils]', () => {
  describe('isEmptyObj()', () => {
    it('should return `true` if object is empty', () => {
      assert.strictEqual(isEmptyObj({}), true);
    });
    it('should return `false` if object has values', () => {
      assert.strictEqual(isEmptyObj({ value: 1 }), false);
    });
  });

  describe('normalizeUrl()', () => {
    it('should return a clean url', () => {
      const dirty = 'D:\\#Dirty\\Path/With/Windows/Strings';
      const clean = 'D:\\%23Dirty\\Path\\With\\Windows\\Strings';
      assert.strictEqual(normalizeUrl(dirty), clean);
    });
  });

  describe('getRandomInt()', () => {
    it('should return an integer', () => {
      assert.typeOf(getRandomInt(1, 3), 'number');
    });
    it('should return an integer bigger than or equal to `min`', () => {
      const min = 1;
      assert.isAtLeast(getRandomInt(min, 3), min);
    });
    it('should return an integer smaller than or equal to `max`', () => {
      const max = 3;
      assert.isAtMost(getRandomInt(1, max), max);
    });
  });
});
