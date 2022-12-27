import type { Song } from '../../../types/library';
import type { Collection } from '../../../types/primitives';

import { getSongs } from '../../ipc/library';
import createCollection from '../../utils/createCollection';

export type LibrarySlice = {
  song: Collection<Song>
};

export default (slice: LibrarySlice) => ({
  fetchSongs: async () => {
    const songs = await getSongs();
    slice.song = createCollection(songs);
  }
});
