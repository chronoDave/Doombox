import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../../types/ipc';
import type Storage from '../../storage';
import type { AppShape } from '../../../../types/shapes/app.shape';

import path from 'path';
import glob from 'fast-glob';

import { mergeUnique } from '../../../../utils/array';

import parse from './utils/parse';
import { createCover, createThumb } from './utils/image';

export type LibraryControllerProps = {
  storage: {
    app: Storage<AppShape>
  }
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
  getSongs: () => props.db.songs.find({}),
  addFolders: async payload => {
    const settings = props.storage.app.get('library');
    const songs = await props.db.songs.find({});
    const folders = mergeUnique(payload, settings.folders);

    if (folders.length === settings.folders.length) return Promise.resolve(songs);

    props.storage.app.set('library', { folders });

    const files = await Promise.all(folders
      .map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
      .then(x => x.flat());

    const fresh = files.filter(x => songs.every(({ file }) => file !== x));
    const stale = songs.reduce<string[]>((acc, song) => {
      if (!files.includes(song.file)) acc.push(song._id);
      return acc;
    }, []);

    props.db.songs.delete(stale);

    const metadata = await parse(fresh);
    await Promise.all(Array.from(metadata.pictures).map(async ([, { _id, raw }]) => {
      await createCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
      await createThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
    }));

    const images: Image[] = Array.from(metadata.pictures, ([, { _id }]) => ({ _id }));
    await props.db.images.insert(images);
    return props.db.songs.insert(metadata.songs);
  },
  removeFolders: async payload => {
    if (payload.length === 0) return props.db.songs.find({});

    const settings = props.storage.app.get('library');
    const folders = settings.folders.filter(x => !payload.includes(x));
    props.storage.app.set('library', { folders });

    const files = await Promise.all(payload
      .map(cwd => glob('**/*.mp3', { cwd, absolute: true })))
      .then(x => x.flat());

    await Promise.all(files.map(file => props.db.songs.deleteOne({ file })));
    return props.db.songs.find({});
  }
});
