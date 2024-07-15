import produce from 'immer';

import difference from '@doombox/lib/list/difference';
import unique from '@doombox/lib/list/unique';

import store from '../../state/store';

export default store.select(state => state.user.library.folders);

export const addFolders = (folders: string[]) => store.set(produce(draft => {
  draft.user.library.folders = unique(draft.user.library.folders)(folders);
}));

export const removeFolders = (folders: string[]) => store.set(produce(draft => {
  draft.user.library.folders = difference(draft.user.library.folders)(folders);
}));
