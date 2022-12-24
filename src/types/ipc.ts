import type { Doc } from 'leaf-db';
import type { Song } from './library';
import type { ThemeShape } from './shapes/theme.shape';
import type { Shape } from './primitives';

export type IpcRouter = (_: unknown, ...args: unknown[]) => unknown;

export enum IpcChannel {
  App = 'app',
  Theme = 'theme',
  Window = 'window',
  Library = 'library'
}

export enum IpcAction {
  SelectFolders = 'selectFolders',
  AddFolders = 'addFolders',
  RemoveFolders = 'removeFolders',
  Get = 'get',
  Set = 'set',
  Minimize = 'minimize',
  Maximize = 'maximize',
  Close = 'close'
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

/** Controller */
export type IpcControllerStorage<T extends Shape> = {
  [IpcAction.Get]: (payload: IpcPayloadGet<T>) => Promise<T[keyof T]>,
  [IpcAction.Set]: (payload: IpcPayloadSet<T>) => Promise<T[keyof T]>
};

/** Renderer to main (one-way) */
export type IpcSendController = {
  [IpcChannel.Window]: {
    [IpcAction.Minimize]: () => void,
    [IpcAction.Maximize]: () => void,
    [IpcAction.Close]: () => void,
  }
};

/** Renderer to main (two-way) */
export type IpcInvokeController = {
  [IpcChannel.App]: {
    [IpcAction.SelectFolders]: () => Promise<string[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>,
  [IpcChannel.Library]: {
    [IpcAction.AddFolders]: (payload: string[]) => Promise<Doc<Song>[]>,
    [IpcAction.RemoveFolders]: (payload: string[]) => Promise<Doc<Song>[]>,
  }
};

export type IpcApi = IpcSendController & IpcInvokeController;
