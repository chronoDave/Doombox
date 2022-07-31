import type { ThemeShape } from '../../../shapes/theme.shape';
import type { Shape } from '../../../types/primitives';

import shape from '../../../shapes/theme.shape';
import { getShape } from '../../../utils/shape';

import Storage from './storage';

export interface AppStorageProps {
  root: string
}

export default class AppStorage extends Storage<ThemeShape> {
  constructor(props: AppStorageProps) {
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
