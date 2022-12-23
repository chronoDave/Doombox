import test from 'tape';
import fs from 'fs';
import path from 'path';

import fixture from './fixture';

test('[library.controller.scanFull] scans folders', async t => {
  const { controller, dir, cleanup } = fixture();

  const songs = await controller.scanFull(dir.album);
  t.equal(songs.length, 11, 'scans all files');

  const covers = fs.readdirSync(dir.covers);
  const thumbs = fs.readdirSync(dir.thumbs);

  t.equal(covers.length, 1, 'creates cover');
  t.equal(thumbs.length, 1, 'creates thumbnail');

  cleanup();
  t.end();
});

test('[library.controller.scanQuick] adds fresh songs', async t => {
  const { controller, dir, cleanup } = fixture();

  await controller.scanFull(dir.sideOne);
  const songs = await controller.scanQuick(dir.sideTwo);
  t.equal(songs.length, 5, 'scans fresh files');

  cleanup();
  t.end();
});

test('[library.controller.scanQuick] removes stale songs', async t => {
  const {
    controller,
    dir,
    db,
    cleanup
  } = fixture();

  const source = path.resolve(dir.sideOne, '01 Bomis Prendin - Rastamunkies.mp3');
  const stale = path.resolve(dir.sideTwo, '__stale.mp3');
  fs.copyFileSync(source, stale);
  const old = await controller.scanFull(dir.sideTwo);
  t.equal(old.length, 6, 'creates stale file');
  fs.rmSync(stale);
  const rastamunkies = old.find(song => song.title === 'Rastamunkies');

  const songs = await controller.scanQuick(dir.sideTwo);
  t.equal(songs.length, 0, 'does not scan existing files');
  const staleSong = await db.songs.findOne(rastamunkies?._id as string);
  t.false(staleSong, 'removes stale song');

  cleanup();
  t.end();
});
