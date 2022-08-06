import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { Shape } from '../../../types/primitives';

import shape, { THEME_SOURCE } from '../../../types/shapes/theme.shape';
import { getShape } from '../../../utils/shape';
import { isKeyOf } from '../../../utils/validation';

import Storage from './storage';

export type ThemeStorageProps = {
  root: string
};

export default class ThemeStorage extends Storage<ThemeShape> {
  constructor(props: ThemeStorageProps) {
    super({ root: props.root, name: 'theme', shape });
  }

  protected _merge(json: Shape) {
    const theme = getShape(json, 'theme');

    const merged: ThemeShape = {
      theme: isKeyOf(theme, THEME_SOURCE) ?
        theme :
        this._data.theme
    };

    return merged;
  }
}
