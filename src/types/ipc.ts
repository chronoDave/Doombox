import type { Shape } from './primitives';

export enum IpcChannel {
  Theme = 'Theme',
  Window = 'Window'
}

export enum IpcAction {
  Get = 'Get',
  Set = 'Set',
  Minimize = 'Minimize',
  Maximize = 'Maximize',
  Close = 'Close'
}

export type IpcEvent = {
  action: IpcAction,
  payload?: unknown
};

/** Payloads */
export type IpcPayloadGet<T extends Shape> = {
  key: keyof T
};

export type IpcPayloadSet<T extends Shape> = {
  key: keyof T,
  value: Partial<T[keyof T]>
};

/** Api */
export type IpcApi = {
  window: {
    minimize: () => void,
    maximize: () => void,
    close: () => void,
  },
  storage: {
    get: <T extends Shape>(
      channel: IpcChannel,
      payload: IpcPayloadGet<T>
    ) => Promise<T[keyof T]>,
    set: <T extends Shape>(
      channel: IpcChannel,
      payload: IpcPayloadSet<T>
    ) => Promise<T[keyof T]>
  }
};
