import type {
  IpcAction,
  IpcEvent,
  IpcPayloadGet,
  IpcPayloadSet
} from './ipc';
import type { Shape } from './primitives';

export type IpcEventGet<T extends Shape> = IpcEvent<IpcAction.Get, IpcPayloadGet<T>>;
export type IpcEventSet<T extends Shape> = IpcEvent<IpcAction.Set, IpcPayloadSet<T>>;
