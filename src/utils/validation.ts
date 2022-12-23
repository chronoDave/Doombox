import type { IpcEvent } from '../types/ipc';
import type { Shape } from '../types/primitives';

import { IpcAction } from '../types/ipc';

export const isObject = (x: unknown): x is Record<string, unknown> =>
  x !== null &&
  typeof x === 'object' &&
  !Array.isArray(x);

export const isJSON = (x: unknown): x is JSON =>
  x === null ||
  typeof x === 'number' ||
  typeof x === 'string' ||
  typeof x === 'boolean' ||
  (Array.isArray(x) && x.every(isJSON)) ||
  (typeof x === 'object' && Object.values(x).every(isJSON));

export const isShape = (x: unknown): x is Shape =>
  isObject(x) &&
  Object.values(x).every(isJSON);

export const isIpcEvent = (x: unknown): x is IpcEvent =>
  isObject(x) &&
  typeof x.action === 'string' &&
  Object.values<string>(IpcAction).includes(x.action);
