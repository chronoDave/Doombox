import type { Image, Song } from '../../../../../src/types/library';
import type { AppShape } from '../../../../../src/types/shapes/app.shape';

import path from 'path';
import fs from 'fs';
import LeafDB from 'leaf-db';

import Storage from '../../../../../src/app/lib/storage';
import libraryController from '../../../../../src/app/lib/controllers/library/library.controller';
import appShape from '../../../../../src/types/shapes/app.shape';

export default () => {
  const root = path.resolve(__dirname, '__data');
  const album = path.resolve(__dirname, '../../../../assets/Bomis Prendin - TEST');

  const dir = {
    root,
    covers: path.resolve(root, 'covers'),
    thumbs: path.resolve(root, 'thumbs'),
    album,
    sideOne: path.resolve(album, 'side one'),
    sideTwo: path.resolve(album, 'side two')
  };

  fs.mkdirSync(dir.root);
  fs.mkdirSync(dir.covers);
  fs.mkdirSync(dir.thumbs);

  const db = {
    images: new LeafDB<Image>(),
    songs: new LeafDB<Song>()
  };

  const storage = {
    app: new Storage<AppShape>({
      name: 'app',
      shape: appShape,
      root: dir.root
    })
  };

  const controller = libraryController({
    storage,
    db,
    root: {
      covers: dir.covers,
      thumbs: dir.thumbs
    }
  });

  const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

  return ({
    db,
    dir,
    controller,
    cleanup
  });
};
