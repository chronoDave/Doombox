import type { Song } from '../../../types/library';
import type { Collection } from '../../../types/primitives';

import { getSongs } from '../../ipc/library';
import createCollection from '../../utils/createCollection';

export default class LibrarySlice {
  private _song: Collection<Song>;

  constructor() {
    this._song = createCollection([]);
  }

  async fetchSongs() {
    const songs = await getSongs();
    console.log(songs);
    this._song = createCollection(songs);
  }
}
