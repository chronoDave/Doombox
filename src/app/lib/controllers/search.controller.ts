import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { Label, Song } from '../../../types/library';
import type LeafDB from 'leaf-db';

export type SongControllerProps = {
  db: {
    songs: LeafDB<Song>,
    labels: LeafDB<Label>
  }
};

export default (props: SongControllerProps) =>
  (): IpcInvokeController[IpcChannel.Search] => ({
    song: async query => props.db.songs.find(query),
    label: async query => props.db.labels.find(query)
  });
