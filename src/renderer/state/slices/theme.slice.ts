import type { ThemeShape } from '../../../types/shapes/theme.shape';

import { getTheme, setTheme } from '../../ipc/theme';

export type ThemeSlice = {
  shape: ThemeShape
};

export default (slice: ThemeSlice) => ({
  fetchTheme: async () => {
    slice.shape = await getTheme();
  },
  setThemeType: async (type: ThemeShape['theme']) => {
    slice.shape.theme = await setTheme('theme', type);
  }
});
