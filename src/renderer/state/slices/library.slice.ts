import type { Song } from '../../../types/library';
import type { Collection } from '../../../types/primitives';

import { getSongs } from '../../ipc/library';
import createCollection from '../../utils/createCollection';
import createSlice from '../../utils/createSlice';

export type LibraryState = {
  empty: boolean
  song: Collection<Song>
};

export default (state: LibraryState) => createSlice({
  setEmpty: (empty: boolean) => {
    state.empty = empty;
  },
  fetchSongs: async () => {
    const songs = await getSongs();
    state.song = createCollection(songs);
  }
}, 'library');
