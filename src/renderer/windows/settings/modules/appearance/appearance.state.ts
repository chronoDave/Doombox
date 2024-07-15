import type { ThemeShape } from '@doombox/types/shapes/theme.shape';

import produce from 'immer';

import store from '../../state/store';

export default store.select(state => state.theme);

export const setTheme = (theme: ThemeShape['theme']) => store.set(produce(draft => {
  draft.theme.theme = theme;
}));
