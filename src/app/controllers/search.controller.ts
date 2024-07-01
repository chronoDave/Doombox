import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type LeafDB from 'leaf-db';

export type SearchControllerProps = {
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: SearchControllerProps): IpcInvokeController[IpcChannel.Search] =>
  ({
    album: async ({ payload }) => props.db.album.select({
      songs: { $has: payload }
    })[0]
  });
