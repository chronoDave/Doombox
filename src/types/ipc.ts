import type { Shape } from './primitives';

export enum IpcChannel {
  Theme = 'THEME'
}

export enum IpcAction {
  Get = 'GET',
  Set = 'SET'
}

export type IpcEvent<T extends IpcAction, K extends Record<string, unknown>> = {
  action: T,
  payload: K
};

/** Payloads */
export type IpcPayloadGet<T extends Shape> = {
  key: keyof T
};

export type IpcPayloadSet<T extends Shape> = {
  key: keyof T,
  value: Partial<T[keyof T]>
};

/** Events */
export type IpcEventGet<T extends Shape> = IpcEvent<IpcAction.Get, IpcPayloadGet<T>>;
export type IpcEventSet<T extends Shape> = IpcEvent<IpcAction.Set, IpcPayloadSet<T>>;

/** Api */
export interface IpcApi {
  get: <T extends Shape>(channel: IpcChannel, payload: IpcPayloadGet<T>) => Promise<T[keyof T]>,
  set: <T extends Shape>(channel: IpcChannel, payload: IpcPayloadSet<T>) => Promise<T[keyof T]>
}
