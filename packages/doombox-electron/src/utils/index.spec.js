const { assert } = require('chai');
const path = require('path');

const { parseMetadata } = require('./index');

const root = path.resolve(__dirname, '../../test/songs');
const corrupt = path.resolve(root, 'Directionless EP/Comfort_Fit_-_03_-_Sorry (corrupted metadata).mp3');
const valid = path.resolve(root, 'Enthusiast/Tours_-_01_-_Enthusiast.mp3');

describe('utils', () => {
  describe('parseMetadata()', () => {
    it('Throws an error on corrupted file', async () => {
      try {
        await parseMetadata(corrupt);
        assert.fail();
      } catch (err) {
        assert.include(err.message, 'Corrupted file');
      }
    });

    it('Throws an error on missing tags', async () => {
      try {
        await parseMetadata(valid, { requiredMetadata: ['TXXX:CATALOGID'] });
        assert.fail();
      } catch (err) {
        assert.include(err.message, 'Missing metadata');
      }
    });

    it('Parses metadata', async () => {
      try {
        const metadata = await parseMetadata(valid);
        assert.hasAnyDeepKeys(metadata, [
          'file',
          'images',
          'format',
          'metadata',
          'titlelocalized',
          'artistlocalized',
          'albumlocalized',
          'albumartistlocalized',
          'cdid',
          'date',
          'event'
        ]);
        assert.isArray(metadata.images);
        assert.hasAnyKeys(metadata.images[0], ['_id', 'format']);
        assert.include(['jpg', 'jpeg', 'png', 'gif'], metadata.images[0].format);
      } catch (err) {
        assert.fail(err);
      }
    });

    it('Ignores covers if skipCovers is true', async () => {
      try {
        const metadata = await parseMetadata(valid, { skipCovers: true });
        assert.isArray(metadata.images);
        assert.isEmpty(metadata.images);
      } catch (err) {
        assert.fail(err);
      }
    });
  });
});
