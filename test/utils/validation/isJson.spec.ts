import test from 'tape';

import { isJSON } from 'src/utils/validation';

test('[validation.isJSON] should return true if object', t => {
  t.true(isJSON(null), 'null');
  t.true(isJSON(1), 'number');
  t.true(isJSON('string'), 'string');
  t.true(isJSON(true), 'boolean');
  t.true(isJSON([]), 'empty array');
  t.true(isJSON({}), 'empty object');
  t.true(isJSON([null, 1, 'string', true, [], {}]), 'filled array');
  t.true(isJSON({ 1: null, 2: 2, 3: '3', 4: true, 5: [], 6: {} }), 'filled object');
  t.true(isJSON({ 1: [{ 2: { 3: [4] } }] }), 'nested object');

  t.end();
});

test('[validation.isJSON] should return false if not object', t => {
  t.false(isJSON(undefined), 'undefined');
  t.false(isJSON([undefined]), 'array with undefined');
  t.false(isJSON({ 1: undefined }), 'object with undefined');
  t.false(isJSON([{ 1: [{ 2: [{ 3: undefined }] }] }]), 'nested undefined');

  t.end();
});
