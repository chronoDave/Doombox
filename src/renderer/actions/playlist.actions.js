import { IPC } from '@doombox-utils/types';

import { ipcInsert } from './ipc.actions';

export const createPlaylist = (
  name,
  collection
) => ipcInsert(IPC.CHANNEL.PLAYLIST, {
  name,
  collection: collection.map(({ _id }) => _id)
});
