import type { Shape } from './primitives';
import type { Enum } from './helpers';

export type IpcChannel =
  'THEME' |
  'WINDOW';

export const IPC_CHANNEL: Enum<IpcChannel> = {
  THEME: 'THEME',
  WINDOW: 'WINDOW'
} as const;

export type IpcAction =
  'GET' |
  'SET' |
  'TOGGLE' |
  'MINIMIZE' |
  'MAXIMIZE' |
  'CLOSE';

export const IPC_ACTION: Enum<IpcAction> = {
  GET: 'GET',
  SET: 'SET',
  TOGGLE: 'TOGGLE',
  MINIMIZE: 'MINIMIZE',
  MAXIMIZE: 'MAXIMIZE',
  CLOSE: 'CLOSE'
} as const;

/** Payloads */
export type IpcPayload = Record<string, unknown>;

export type IpcPayloadGet<T extends Shape> = {
  key: keyof T
};

export type IpcPayloadSet<T extends Shape> = {
  key: keyof T,
  value: Partial<T[keyof T]>
};

/** Events */
export type IpcEvent<
  T extends IpcAction = IpcAction,
  K extends IpcPayload = IpcPayload
> = {
  action: T,
  payload: K
};

/** Api */
export type IpcApi = {
  minimize: () => void,
  maximize: () => void,
  close: () => void,
  get: <T extends Shape>(
    channel: IpcChannel,
    payload: IpcPayloadGet<T>
  ) => Promise<T[keyof T]>,
  set: <T extends Shape>(
    channel: IpcChannel,
    payload: IpcPayloadSet<T>
  ) => Promise<T[keyof T]>,
  toggle: <T extends Shape>(
    channel: IpcChannel,
    payload: IpcPayloadGet<T>
  ) => Promise<T[keyof T]>
};
