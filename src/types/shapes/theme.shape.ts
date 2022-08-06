import type { Constrain, Enum } from '../helpers';
import type { Json } from '../primitives';
import type { NativeTheme } from 'electron/main';

export const THEME_SOURCE: Enum<NativeTheme['themeSource']> = {
  system: 'system',
  dark: 'dark',
  light: 'light'
};

export type ThemeShape = Constrain<Json, {
  theme: NativeTheme['themeSource']
}>;

const themeShape: Readonly<ThemeShape> = {
  theme: 'system'
};

export default themeShape;
