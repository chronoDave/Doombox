import type { TransferController } from '../../types/ipc';
import type { Playlist } from '../../types/playlist';

import LeafDB from 'leaf-db';

export type PlaylistControllerProps = {
  db: LeafDB<Playlist>
};

export default (props: PlaylistControllerProps): TransferController['playlist'] =>
  ({
    get: async () => props.db.select({}),
    add: async songs => props.db.insert([{
      _id: LeafDB.id(),
      title: 'New playlist',
      songs,
      image: null
    }])[0],
    update: async ({ _id, ...playlist }) => {
      props.db.update(playlist, { _id });
      return props.db.select({});
    },
    remove: async _id => {
      props.db.delete({ _id });
      return props.db.select({});
    }
  });
