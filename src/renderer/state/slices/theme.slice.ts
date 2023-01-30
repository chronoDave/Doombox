import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('theme')({
  setTheme: (theme: ThemeShape) => produce(draft => {
    draft.theme = theme;
  }),
  setThemeType: (type: ThemeShape['theme']) => produce(draft => {
    draft.theme.theme = type;
  })
});
