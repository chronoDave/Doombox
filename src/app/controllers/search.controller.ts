import type { TransferController } from '../../types/ipc';
import type { Album, Label, Song } from '../../types/library';
import type LeafDB from 'leaf-db';

export type SearchControllerProps = {
  db: {
    song: LeafDB<Song>
    album: LeafDB<Album>
    label: LeafDB<Label>
  }
};

export default (props: SearchControllerProps): TransferController['search'] =>
  ({
    album: async query => props.db.album.select({
      songs: { $has: query }
    })[0]
  });
