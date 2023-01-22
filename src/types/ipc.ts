import type { Library } from './library';
import type { Shape } from './primitives';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { IpcMainInvokeEvent } from 'electron';

export type IpcRouter = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

export enum IpcChannel {
  App = 'app',
  User = 'user',
  Theme = 'theme',
  Window = 'window',
  Library = 'library',
  Scan = 'scan',
  Listener = 'on'
}

export enum IpcAction {
  SelectFolders = 'selectFolders',
  Add = 'add',
  Remove = 'remove',
  Rebuild = 'rebuild',
  All = 'all',
  Get = 'get',
  Set = 'set',
  Minimize = 'minimize',
  Maximize = 'maximize',
  Close = 'close'
}

export type IpcEvent = {
  action: IpcAction
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

export type IpcPayloadScan = {
  size?: number,
  file?: string
};

/** Controller */
export type IpcControllerStorage<T extends Shape> = {
  [IpcAction.Get]: (payload: IpcPayloadGet<T>) => Promise<T[keyof T]>
  [IpcAction.Set]: (payload: IpcPayloadSet<T>) => Promise<T>
  [IpcAction.All]: () => Promise<T>
};

/** Renderer to main (one-way) */
export type IpcSendController = {
  [IpcChannel.Window]: {
    [IpcAction.Minimize]: () => void
    [IpcAction.Maximize]: () => void
    [IpcAction.Close]: () => void
  }
};

/** Renderer to main (two-way) */
export type IpcInvokeController = {
  [IpcChannel.App]: {
    [IpcAction.SelectFolders]: () => Promise<string[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Library]: {
    [IpcAction.Add]: (payload: string[]) => Promise<Library>
    [IpcAction.Remove]: (payload: string[]) => Promise<Library>
    [IpcAction.Get]: () => Promise<Library>
    [IpcAction.Rebuild]: (payload: string[]) => Promise<Library>
  }
};

/** Main to renderer (one-way) */
export type IpcReceiveController = {
  [IpcChannel.Listener]: {
    [IpcChannel.Scan]: (cb: (payload: IpcPayloadScan) => void) => () => void
  }
};

export type IpcApi = IpcSendController & IpcInvokeController & IpcReceiveController;
