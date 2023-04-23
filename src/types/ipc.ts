import type { Label, Library, Song } from './library';
import type { Shape } from './primitives';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { IpcMainInvokeEvent } from 'electron';
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
  Search = 'search'
}

export type IpcChannelReceive<T extends IpcChannel> = `${IpcChannel.Receive}.${T}`;

export enum IpcRoute {
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
  Song = 'song',
  Album = 'album',
  Label = 'label'
}

/** Events */
export type IpcEvent = {
  action: IpcRoute
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
  [IpcRoute.Get]: (payload: keyof T) => Promise<T[keyof T]>
  [IpcRoute.Set]: (payload: T) => Promise<T>
  [IpcRoute.All]: () => Promise<T>
};

/** Renderer to main (one-way) */
export type IpcSendController = {
  [IpcChannel.Window]: {
    [IpcRoute.Minimize]: () => void
    [IpcRoute.Maximize]: () => void
    [IpcRoute.Close]: () => void
  }
};

/** Renderer to main (two-way) */
export type IpcInvokeController = {
  [IpcChannel.App]: {
    [IpcRoute.SelectFolders]: () => Promise<string[]>
  }
  [IpcChannel.Search]: {
    [IpcRoute.Song]: (payload: Query) => Promise<Song[]>,
    [IpcRoute.Label]: (payload: Query) => Promise<Label[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Library]: {
    [IpcRoute.Add]: (payload: string[]) => Promise<Library>
    [IpcRoute.Remove]: (payload: string[]) => Promise<Library>
    [IpcRoute.Get]: () => Promise<Library>
    [IpcRoute.Rebuild]: (payload: {
      folders: string[],
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
