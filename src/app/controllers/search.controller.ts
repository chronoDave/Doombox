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
    song: async queries => props.db.song.select(...queries),
    album: async queries => props.db.album.select(...queries),
    label: async queries => props.db.label.select(...queries)
  });
