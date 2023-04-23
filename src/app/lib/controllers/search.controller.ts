import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';
import type { Song } from '../../../types/library';
import type LeafDB from 'leaf-db';

export type SongControllerProps = {
  db: LeafDB<Song>
};

export default (props: SongControllerProps) =>
  (): IpcInvokeController[IpcChannel.Search] => ({
    song: async query => props.db.find(query)
  });
