import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../../types/ipc';

import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

import parse from './utils/parse';
import { createCover, createThumb } from './utils/image';

export type LibraryControllerProps = {
  root: {
    covers: string,
    thumbs: string
  },
  db: {
    images: LeafDB<Image>,
    songs: LeafDB<Song>
  }
};

export default (props: LibraryControllerProps): IpcInvokeController[IpcChannel.Library] => ({
  /**
   * 1) Search new files in folder
   * 2) Find stale files in database
   * 3) Delete stale images from folder
   * 4) Delete stale data from database
   * 5) Parse metadata in folder
   * 6) Create images
   * 7) Insert data into database
   */
  scanQuick: async payload => {
    const files = glob.sync('**/*.mp3', { cwd: payload, absolute: true });
    const newSongs = await props.db.songs.find({});

    const fresh = files.filter(file => !newSongs.some(song => song.file === file));
    const stale = newSongs.filter(song => !files.includes(song.file));
    props.db.songs.delete(stale.map(song => song._id));

    const { songs, pictures } = await parse(fresh);

    await Promise.all(Array.from(pictures).map(async ([, { _id, raw }]) => {
      await createCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
      await createThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
    }));

    const images: Image[] = Array.from(pictures, ([, { _id }]) => ({ _id }));

    await props.db.images.insert(images);
    return props.db.songs.insert(songs);
  },
  /**
   * 1) Clear images
   * 2) Flush database
   * 3) Parse all metadata in folder
   * 4) Create images
   * 5) Insert data into database
   */
  scanFull: async payload => {
    fs.rmSync(props.root.covers, { recursive: true, force: true });
    fs.rmSync(props.root.thumbs, { recursive: true, force: true });
    fs.mkdirSync(props.root.covers, { recursive: true });
    fs.mkdirSync(props.root.thumbs, { recursive: true });
    props.db.images.drop();
    props.db.songs.drop();

    const files = glob.sync('**/*.mp3', { cwd: payload, absolute: true });
    const { songs, pictures } = await parse(files);

    await Promise.all(Array.from(pictures).map(async ([, { _id, raw }]) => {
      await createCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
      await createThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
    }));

    const images: Image[] = Array.from(pictures, ([, { _id }]) => ({ _id }));

    await props.db.images.insert(images);
    return props.db.songs.insert(songs);
  },
  getSongs: () => props.db.songs.find({})
});
