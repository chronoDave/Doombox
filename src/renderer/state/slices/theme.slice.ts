import type { ThemeShape } from '../../../types/shapes/theme.shape';

import { getTheme } from '../../ipc/theme';

export type ThemeSlice = {
  shape: ThemeShape
};

export const fetchTheme = async (slice: ThemeSlice) => {
  slice.shape = await getTheme();
};
