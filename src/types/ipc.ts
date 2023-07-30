import type {
  Album,
  Label,
  Library,
  Song
} from './library';
import type { Shape } from './primitives';
import type { CacheShape } from './shapes/cache.shape';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { IpcMainInvokeEvent } from 'electron';
import type { Query } from 'leaf-db';

export type IpcRouter = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

export enum IpcChannel {
  App = 'app',
  User = 'user',
  Theme = 'theme',
  Cache = 'cache',
  Window = 'window',
  Library = 'library',
  Receive = 'on',
  Search = 'search'
}

export type IpcChannelReceive<T extends IpcRoute> = `${IpcChannel.Receive}.${T}`;

export enum IpcRoute {
  SelectFolders = 'selectFolders',
  Add = 'add',
  Directory = 'directory',
  Remove = 'remove',
  Rebuild = 'rebuild',
  Reindex = 'reindex',
  Get = 'get',
  Set = 'set',
  Minimize = 'minimize',
  Maximize = 'maximize',
  Close = 'close',
  Song = 'song',
  Album = 'album',
  Label = 'label',
  Image = 'image'
}

/** Events */
export type IpcEvent = {
  action: IpcRoute
  payload?: unknown
};

/** Payloads */
export type IpcPayloadReceive = {
  [IpcRoute.Song]: {
    file: string
    cur: number
    size: number
  },
  [IpcRoute.Image]: {
    file: string
    cur: number
    size: number
  }
};

/** Controller */
export type IpcControllerStorage<T extends Shape> = {
  [IpcRoute.Get]: () => Promise<T>
  [IpcRoute.Set]: (payload: T) => Promise<T>
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
    [IpcRoute.SelectFolders]: () => Promise<string[]>,
    [IpcRoute.Directory]: () => Promise<{ thumbs: string }>
  },
  [IpcChannel.Search]: {
    [IpcRoute.Song]: (payload: Array<Query<Song>>) => Promise<Song[]>
    [IpcRoute.Album]: (payload: Array<Query<Album>>) => Promise<Album[]>
    [IpcRoute.Label]: (payload: Array<Query<Label>>) => Promise<Label[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Cache]: IpcControllerStorage<CacheShape>,
  [IpcChannel.Library]: {
    [IpcRoute.Add]: (folders: string[]) => Promise<Library>
    [IpcRoute.Remove]: (payload: string[]) => Promise<Library>
    [IpcRoute.Get]: () => Promise<Library>
    [IpcRoute.Reindex]: (folders: string[]) => Promise<Library>
    [IpcRoute.Rebuild]: () => Promise<Library>
  }
};

/** Main to renderer (one-way) */
export type IpcReceiveController = {
  [T in keyof IpcPayloadReceive]: (cb: (payload: IpcPayloadReceive[T]) => void) => () => void
};

export type IpcApi = IpcSendController & IpcInvokeController & {
  [IpcChannel.Receive]: IpcReceiveController
};
