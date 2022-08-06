import type { ThemeShape } from '../../../types/shapes/theme.shape';
import type { Shape } from '../../../types/primitives';

import shape from '../../../types/shapes/theme.shape';
import { getShape } from '../../../utils/shape';

import Storage from './storage';

export type ThemeStorageProps = {
  root: string
};

export default class ThemeStorage extends Storage<ThemeShape> {
  constructor(props: ThemeStorageProps) {
    super({ root: props.root, name: 'app', shape });
  }

  protected _merge(json: Shape) {
    const darkTheme = getShape(json, 'darkTheme');

    const merged: ThemeShape = {
      darkTheme: typeof darkTheme === 'boolean' ?
        darkTheme :
        this._data.darkTheme
    };

    return merged;
  }
}
