import type { IpcEvent } from '../../types/ipc';

import { IpcRoute } from '../../types/ipc';

import isObject from './isObject';

export default (x: unknown): x is IpcEvent =>
  isObject(x) &&
  typeof x.action === 'string' &&
  Object.values<string>(IpcRoute).includes(x.action);
