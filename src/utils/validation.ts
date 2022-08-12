import type { IpcEvent, IpcPayloadGet, IpcPayloadSet } from '../types/ipc';
import type { Shape } from '../types/primitives';

import { IpcAction } from '../types/ipc';

export const isObject = (x: unknown): x is Record<string, unknown> =>
  x !== null &&
  typeof x === 'object' &&
  !Array.isArray(x);

export const isKeyOf = <T extends Record<string, unknown>>(x: unknown, obj: T): x is keyof T =>
  typeof x === 'string' &&
  Object.keys(obj).includes(x);

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
  isKeyOf(x.action, IpcAction);

export const isIpcPayloadGet = <T extends Shape>(x: unknown): x is IpcPayloadGet<T> =>
  isObject(x) &&
  'key' in x;

export const isIpcPayloadSet = <T extends Shape>(x: unknown): x is IpcPayloadSet<T> =>
  isObject(x) &&
  'key' in x &&
  'value' in x;
