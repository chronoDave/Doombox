import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type LeafDB from 'leaf-db';

export type SongControllerProps = {
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: SongControllerProps) =>
  (): IpcInvokeController[IpcChannel.Search] => ({
    song: async query => props.db.song.find(query),
    album: async query => props.db.album.find(query),
    label: async query => props.db.label.find(query)
  });
