import type {
  Album,
  Label,
  Song,
  Image
} from '../../../types/library';
import type { Collection } from '../../../types/primitives';

import { getLibrary } from '../../ipc/library';
import createCollection from '../../utils/createCollection';
import createSlice from '../../utils/createSlice';

export type LibraryState = {
  empty: boolean
  song: Collection<Song>
  album: Collection<Album>
  label: Collection<Label>
  image: Collection<Image>
};

export default (state: LibraryState) => createSlice({
  setEmpty: (empty: boolean) => {
    state.empty = empty;
  },
  fetchLibrary: async () => {
    const library = await getLibrary();
    state.song = createCollection(library.songs);
    state.album = createCollection(library.albums);
    state.label = createCollection(library.labels);
    state.image = createCollection(library.images);
  }
}, 'library');
