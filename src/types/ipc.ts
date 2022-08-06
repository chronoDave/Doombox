import type { Shape } from './primitives';

export enum IpcChannel {
  Theme = 'THEME',
  Window = 'WINDOW'
}

export type IpcChannelStorage =
  IpcChannel.Theme;

export enum IpcAction {
  Get = 'GET',
  Set = 'SET',
  Minimize = 'MINIMIZE',
  Maximize = 'MAXIMIZE',
  Close = 'CLOSE'
}

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
    channel: IpcChannelStorage,
    payload: IpcPayloadGet<T>
  ) => Promise<T[keyof T]>,
  set: <T extends Shape>(
    channel: IpcChannelStorage,
    payload: IpcPayloadSet<T>
  ) => Promise<T[keyof T]>
};
