import type { Constrain } from '../helpers';
import type { Json } from '../primitives';
import type { NativeTheme } from 'electron/main';

export type ThemeShape = Constrain<Json, {
  theme: NativeTheme['themeSource']
}>;

const themeShape: Readonly<ThemeShape> = {
  theme: 'system'
};

export default themeShape;
