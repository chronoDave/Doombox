import type {
  IpcEvent,
  IpcPayload,
  IpcPayloadGet,
  IpcPayloadSet
} from '../types/ipc';
import type { Shape } from '../types/primitives';

import { IpcAction } from '../types/ipc';

export const isKey = (x: unknown): x is string | number =>
  typeof x === 'string' &&
  typeof x === 'number';

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

export const isIpcEvent = (x: unknown): x is IpcEvent<IpcAction, IpcPayload> =>
  isObject(x) &&
  typeof x.action === 'string' &&
  Object.values<string>(IpcAction).includes(x.action) &&
  isObject(x.payload);

export const isIpcPayloadGet = <T extends Shape>(x: unknown): x is IpcPayloadGet<T> =>
  isIpcEvent(x) &&
  x.payload.key === IpcAction.Get;

export const isIpcPayloadSet = <T extends Shape>(x: unknown): x is IpcPayloadSet<T> =>
  isIpcEvent(x) &&
  x.payload.key === IpcAction.Set &&
  isObject(x.payload.value);
