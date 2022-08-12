import type {
  IpcEvent,
  IpcPayload,
  IpcPayloadGet,
  IpcPayloadSet,
  IpcAction
} from '../types/ipc';
import type { Shape } from '../types/primitives';

import { IPC_ACTION } from '../types/ipc';

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

export const isIpcEvent = (x: unknown): x is IpcEvent<IpcAction, IpcPayload> =>
  isObject(x) &&
  isKeyOf(x.action, IPC_ACTION) &&
  isObject(x.payload);

export const isIpcEventGet = <T extends Shape>(x: unknown): x is IpcEvent<'GET', IpcPayloadGet<T>> =>
  isIpcEvent(x) &&
  x.action === 'GET' &&
  typeof x.payload.key === 'string';

export const isIpcEventSet = <T extends Shape>(x: unknown): x is IpcEvent<'SET', IpcPayloadSet<T>> =>
  isIpcEvent(x) &&
  x.action === 'SET' &&
  typeof x.payload.key === 'string' &&
  !!x.payload.value;
