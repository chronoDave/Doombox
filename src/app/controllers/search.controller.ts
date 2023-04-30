import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type LeafDB from 'leaf-db';

export type SongControllerProps = {
  db: {
    songs: LeafDB<Song>
    albums: LeafDB<Album>
    labels: LeafDB<Label>
  }
};

export default (props: SongControllerProps) =>
  (): IpcInvokeController[IpcChannel.Search] => ({
    song: async query => props.db.songs.find(query),
    album: async query => props.db.albums.find(query),
    label: async query => props.db.labels.find(query)
  });
