import type { ThemeShape } from '../../../types/shapes/theme.shape';

import { getTheme, setTheme } from '../../ipc/theme';
import createSlice from '../../utils/createSlice';

export type ThemeState = {
  shape: ThemeShape
};

export default (state: ThemeState) => createSlice({
  fetchTheme: async () => {
    state.shape = await getTheme();
  },
  setThemeType: async (type: ThemeShape['theme']) => {
    state.shape.theme = await setTheme('theme', type);
  }
}, 'theme');
