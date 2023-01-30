import type { ThemeShape } from '../../../../types/shapes/theme.shape';
import type { State } from '../state';

import produce from 'immer';

import combineReducers from '../utils/combineReducer';

export default combineReducers<State>('theme')({
  setTheme: (theme: ThemeShape) => produce(draft => {
    draft.theme = theme;
  }),
  setThemeType: (type: ThemeShape['theme']) => produce(draft => {
    draft.theme.theme = type;
  })
});
