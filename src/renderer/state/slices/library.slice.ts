import type { Library } from '../../../types/library';
import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('library')({
  setLibrary: (library: Library) => produce(draft => {
    draft.library.songs = {
      list: library.songs,
      map: new Map(library.songs.map(song => [song._id, song]))
    };
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  })
});
