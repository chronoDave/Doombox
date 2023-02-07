import type { Library, Song } from './library';
import type { Shape } from './primitives';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { IpcMainInvokeEvent } from 'electron';
import type { Immutable } from 'immer';
import type { Query } from 'leaf-db';

export type IpcRouter = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

export enum IpcChannel {
  App = 'app',
  User = 'user',
  Theme = 'theme',
  Window = 'window',
  Library = 'library',
  Scan = 'scan',
  Receive = 'on',
  Song = 'song',
  Album = 'album',
  Label = 'label'
}

export type IpcChannelReceive<T extends IpcChannel> = `${IpcChannel.Receive}.${T}`;

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
  Close = 'close',
  Search = 'search'
}

/** Events */
export type IpcEvent = {
  action: IpcAction
  payload?: unknown
};

/** Payloads */
export type IpcPayloadReceive = {
  [IpcChannel.Scan]: {
    process: string
    file: string
    size: number
  }
};

/** Controller */
export type IpcControllerStorage<T extends Shape> = {
  [IpcAction.Get]: (payload: keyof T) => Promise<T[keyof T]>
  [IpcAction.Set]: (payload: Immutable<T>) => Promise<T>
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
  [IpcChannel.Song]: {
    [IpcAction.Search]: (payload: Query) => Promise<Song[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Library]: {
    [IpcAction.Add]: (payload: readonly string[]) => Promise<Library>
    [IpcAction.Remove]: (payload: readonly string[]) => Promise<Library>
    [IpcAction.Get]: () => Promise<Library>
    [IpcAction.Rebuild]: (payload: {
      folders: readonly string[],
      force?: boolean
    }) => Promise<Library>
  }
};

/** Main to renderer (one-way) */
export type IpcReceiveController = {
  [T in keyof IpcPayloadReceive]: (cb: (payload: IpcPayloadReceive[T]) => void) => () => void
};

export type IpcApi = IpcSendController & IpcInvokeController & {
  [IpcChannel.Receive]: IpcReceiveController
};
