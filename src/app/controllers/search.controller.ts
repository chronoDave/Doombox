import type { IpcChannel, IpcInvokeController } from '../../types/ipc';
import type { LibraryDatabase } from '../types';

export type SongControllerProps = {
  library: LibraryDatabase
};

export default (props: SongControllerProps) =>
  (): IpcInvokeController[IpcChannel.Search] => ({
    song: async query => props.library.songs.find(query),
    album: async query => props.library.albums.find(query),
    label: async query => props.library.labels.find(query)
  });
