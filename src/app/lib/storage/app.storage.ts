import shape from '../../../shapes/app.shape';
import type { ShapeApp } from '../../../shapes/app.shape';
import type { Shape } from '../../../types';
import { getShape } from '../../../utils/shape';

import Storage from './storage';

export interface AppStorageProps {
  root: string
}

export default class AppStorage extends Storage<ShapeApp> {
  constructor(props: AppStorageProps) {
    super({ root: props.root, name: 'app', shape });
  }

  protected _merge(json: Shape) {
    const x = getShape(json, 'window.x');
    const y = getShape(json, 'window.y');
    const width = getShape(json, 'window.width');
    const height = getShape(json, 'window.height');

    const merged: ShapeApp = {
      window: {
        width: typeof width === 'number' ?
          width :
          this._data.window.width,
        height: typeof height === 'number' ?
          height :
          this._data.window.height
      }
    };

    if (typeof x === 'number') merged.window.x = x;
    if (typeof y === 'number') merged.window.y = y;

    return merged;
  }
}
