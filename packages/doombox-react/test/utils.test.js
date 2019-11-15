import { assert } from 'chai';

import {
  isEmptyObj,
  cleanUrl,
  getRandomInt,
  shuffleArray,
  formatTime
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

  describe('cleanUrl()', () => {
    it('should return a clean url', () => {
      const dirty = 'D:\\#Dirty\\Windows\\Path';
      const clean = 'D:/%23Dirty/Windows/Path';
      assert.strictEqual(cleanUrl(dirty), clean);
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

  describe('shuffleArray()', () => {
    it('should shuffle the array', () => {
      const original = ['a', 'b', 'c', 'd', 'e'];
      assert.notStrictEqual(shuffleArray(original), original);
    });
  });

  describe('formatTime()', () => {
    it('should convert seconds to minutes', () => {
      assert.strictEqual(formatTime(3), '00:03');
      assert.strictEqual(formatTime(30), '00:30');
      assert.strictEqual(formatTime(60), '01:00');
      assert.strictEqual(formatTime(600), '10:00');
    });
    it('should display hours when time is more than an hour', () => {
      assert.strictEqual(formatTime(3601), '01:00:01');
    });
  });
});
