import type { Image, Song } from '../../../../../src/types/library';

import path from 'path';
import fs from 'fs';
import LeafDB from 'leaf-db';

import libraryController from '../../../../../src/app/lib/controllers/library/library.controller';

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

  const db = {
    images: new LeafDB<Image>(),
    songs: new LeafDB<Song>()
  };

  const controller = libraryController({
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
