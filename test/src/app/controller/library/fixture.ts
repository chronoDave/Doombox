import type { Album, Label, Song } from '../../../../../src/types/library';

import fs from 'fs';
import LeafDB from 'leaf-db';
import path from 'path';

import libraryController from '../../../../../src/app/lib/controllers/library/library.controller';

export default () => {
  const root = path.resolve(__dirname, '__data');
  const album = path.resolve(__dirname, '../../../../assets/Bomis Prendin - TEST');

  const dir = {
    root,
    covers: path.resolve(root, 'covers'),
    album,
    sideOne: path.resolve(album, 'side one'),
    sideTwo: path.resolve(album, 'side two')
  };

  fs.mkdirSync(dir.root);
  fs.mkdirSync(dir.covers);

  const db = {
    songs: new LeafDB<Song>(),
    albums: new LeafDB<Album>(),
    labels: new LeafDB<Label>()
  };

  const sender = { send: () => {} } as any as Electron.WebContents;
  const controller = libraryController({
    db,
    root: dir.covers
  })(sender);

  const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

  return ({
    db,
    dir,
    controller,
    cleanup
  });
};
