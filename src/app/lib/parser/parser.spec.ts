import type { ParserEvents } from './parser';
import type { INativeTags } from 'music-metadata/lib/type';

import glob from 'fast-glob';
import path from 'path';
import test from 'tape';

import Parser from './parser';

test('[parser.parseFile] parses file', async t => {
  const file = path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST/side one/01 Bomis Prendin - Rastamunkies.mp3');

  const song = await Parser.parseFile(file);

  t.true(song, 'parses file');
  t.equal(song.title, 'Rastamunkies', 'parses common tag');
  t.equal(song.date, '2010-04-16 16:40:50', 'parses native tag');
  t.true(song.image, 'parses image');

  t.end();
});

test('[parser.parse] emits parse event', async t => {
  const file = path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST/side one/01 Bomis Prendin - Rastamunkies.mp3');
  const parser = new Parser();

  const events: Array<Parameters<ParserEvents['parse']>[0]> = [];
  parser.on('parse', payload => events.push(payload));

  await parser.parse([file]);

  t.equal(events.length, 1, 'emits parse event');
  t.equal(events[0].file, file, 'emits file');

  t.end();
});

test('[parser.parse] parses files', async t => {
  const parser = new Parser();
  const files = await glob('**/*.mp3', {
    absolute: true,
    cwd: path.resolve(__dirname, '../../../../../test/assets/Bomis Prendin - TEST')
  });

  const { songs, images } = await parser.parse(files);
  const imageIds = new Set(songs.map(song => song.image));

  t.equal(songs.length, 11, 'parses all songs');
  t.equal(images.size, 1, 'parses all images');
  t.equal(imageIds.size, 1, 'creates unique image ids');

  t.end();
});

test('[parser.getNativeTag] gets native tag', t => {
  const nativeTags: INativeTags = {
    NATIVE: [{ id: 'NATIVE', value: 1 }],
    TAG: [{ id: 'TAG', value: 2 }]
  };

  const getNativeTag = Parser.getNativeTag(nativeTags);

  t.equal(getNativeTag('NATIVE'), 1, 'gets native tag');
  t.false(getNativeTag('TEST'), 'does not return tag');

  t.end();
});
