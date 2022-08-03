import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type ThemeShape = Constrain<Json, {
  darkTheme: boolean
}>;

const themeShape: Readonly<ThemeShape> = {
  darkTheme: true
};

export default themeShape;
