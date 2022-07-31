import type { Constrain } from '../types/helpers';
import type { Json } from '../types/primitives';

export type ThemeShape = Constrain<Json, {
  darkTheme: boolean
}>;

const themeShape: Readonly<ThemeShape> = {
  darkTheme: true
};

export default themeShape;
