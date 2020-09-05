const test = require('ava');
const path = require('path');

const objectGet = require('lodash.get');

const { parseMetadata } = require('./index');

const root = path.resolve(__dirname, '../../../../test/songs');
const corrupt = path.resolve(root, 'Directionless EP/Comfort_Fit_-_03_-_Sorry (corrupted metadata).mp3');
const valid = path.resolve(root, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

test('should throw an error on corrupted file', async t => {
  try {
    await parseMetadata(corrupt);

    t.fail('expected an error');
  } catch (err) {
    t.true(err.message.includes('Corrupted file'), 'throws expected error');
  }
});

test('should throw an error on missing tags', async t => {
  try {
    await parseMetadata(valid, { requiredMetadata: ['TXXX:CATALOGID'] });

    t.fail('expected an error');
  } catch (err) {
    t.true(err.message.includes('Missing metadata'), 'throws expected error');
  }
});

test('parses metadata', async t => {
  try {
    const metadata = await parseMetadata(valid);

    const expectedTags = [
      'file',
      'images',
      'format',
      'metadata.titlelocalized',
      'metadata.artistlocalized',
      'metadata.albumlocalized',
      'metadata.albumartistlocalized',
      'metadata.cdid',
      'metadata.date',
      'metadata.event'
    ];
    for (let i = 0; i < expectedTags.length; i += 1) {
      const tag = expectedTags[i];

      t.not(objectGet(metadata, tag), undefined, `has tag: '${tag}'`);
      if (tag === 'images') {
        t.is(metadata.images.length, 1);
        t.true(typeof metadata.images[0]._id === 'string');
        t.is(metadata.images[0].format, 'png');
      }
    }
  } catch (err) {
    t.fail(err);
  }
});
