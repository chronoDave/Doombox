import type { Constrain } from '../helpers';
import type { Json } from '../primitives';
import type { NativeTheme } from 'electron/main';

export type ThemeShape = Constrain<Json, {
  theme: NativeTheme['themeSource']
  player: {
    cover: 'cover' | 'contain'
  }
}>;

const themeShape: Readonly<ThemeShape> = {
  theme: 'system',
  player: {
    cover: 'contain'
  }
};

export default themeShape;
