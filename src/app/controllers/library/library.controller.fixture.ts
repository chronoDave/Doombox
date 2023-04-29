import type { Album, Label, Song } from '../../../types/library';

import fs from 'fs';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LeafDB from 'leaf-db';
import path from 'path';

import userShape from '../../../types/shapes/user.shape';
import Storage from '../../lib/storage/storage';

import createLibraryController from './library.controller';

export default async () => {
  const root = path.resolve(__dirname, '__data');
  const album = path.resolve(__dirname, '../../../../assets/Bomis Prendin - TEST');
  const analyzer = new Kuroshiro();
  await analyzer.init(new KuromojiAnalyzer());

  const dir = {
    root,
    covers: path.resolve(root, 'covers'),
    album,
    sideOne: path.resolve(album, 'side one'),
    sideTwo: path.resolve(album, 'side two')
  };

  fs.mkdirSync(dir.root, { recursive: true });
  fs.mkdirSync(dir.covers, { recursive: true });

  const db = {
    songs: new LeafDB<Song>(),
    albums: new LeafDB<Album>(),
    labels: new LeafDB<Label>()
  };

  const storage = new Storage({
    name: 'test',
    shape: userShape,
    root: dir.root
  });

  const sender = { send: () => { } } as any as Electron.WebContents;
  const controller = createLibraryController({
    db,
    root: dir.covers,
    analyzer,
    storage
  })(sender);

  const cleanup = () => fs.rmSync(root, { recursive: true, force: true });

  return ({
    db,
    dir,
    controller,
    cleanup
  });
};
