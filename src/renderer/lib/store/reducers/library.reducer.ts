import type { Library } from '../../../../types/library';
import type { State } from '../state';

import produce from 'immer';

import combineReducers from '../utils/combineReducer';

export default combineReducers<State>('library')({
  setLibrary: (library: Library) => produce(draft => {
    draft.library.songs = {
      list: library.songs,
      map: new Map(library.songs.map(song => [song._id, song]))
    };
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  })
});
