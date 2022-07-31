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

export type IpcPayloadGet<T extends Shape> = {
  key: keyof T
};

export type IpcPayloadSet<T extends Shape> = {
  key: keyof T,
  value: Partial<T[keyof T]>
};
