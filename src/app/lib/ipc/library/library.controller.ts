import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../../types/ipc';

import path from 'path';

import parse from './utils/parse';
import scan from './utils/scan';
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
  scan: async payload => {
    const files = await scan(payload);
    const { songs, pictures } = parse(files);

    try {
      pictures.forEach(({ _id, raw }) => {
        createCover(raw, path.resolve(props.root.covers, `${_id}.jpg`));
        createThumb(raw, path.resolve(props.root.thumbs, `${_id}.jpg`));
      });
    } catch (err) {
      return Promise.reject(err);
    }

    const images: Image[] = Array.from(pictures, ([, { _id }]) => ({ _id }));

    await props.db.images.insert(images);
    return props.db.songs.insert(songs);
  }
});
