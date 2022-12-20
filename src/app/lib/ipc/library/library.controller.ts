import type LeafDB from 'leaf-db';
import type { Image, Song } from '../../../../types/library';
import type { IpcChannel, IpcInvokeController } from '../../../../types/ipc';

import parse from '../../library/parse';
import scan from '../../library/scan';

export type LibraryControllerProps = {
  db: {
    images: LeafDB<Image>,
    songs: LeafDB<Song>
  }
};

export default (props: LibraryControllerProps): IpcInvokeController[IpcChannel.Library] => ({
  scan: async payload => {
    const files = await scan(payload);
    const { songs, pictures } = parse(files);

    const images: Image[] = Array.from(pictures, ([, _id]) => ({
      _id,
      original: `${_id}.jpg`,
      thumb: `thumbs/${_id}.jpg`
    }));

    await props.db.songs.insert(songs);
    await props.db.images.insert(images);

    return props.db.songs.find({});
  }
});
