import type { Library } from './library';
import type { Playlist } from './playlist';
import type { Shape } from './primitives';
import type { CacheShape } from './shapes/cache.shape';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { IpcMainInvokeEvent } from 'electron';

export type IpcRouter = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

export enum IpcChannel {
  App = 'app',
  User = 'user',
  Theme = 'theme',
  Cache = 'cache',
  Window = 'window',
  Library = 'library',
  Receive = 'on',
  Playlist = 'playlist',
  Player = 'player'
}

export type IpcChannelReceive<T extends IpcRoute> = `${IpcChannel.Receive}.${T}`;

export enum IpcRoute {
  SelectFolders = 'selectFolders',
  Add = 'add',
  Remove = 'remove',
  Rebuild = 'rebuild',
  Reindex = 'reindex',
  Get = 'get',
  Set = 'set',
  Minimize = 'minimize',
  Maximize = 'maximize',
  Update = 'update',
  Close = 'close',
  Song = 'song',
  Album = 'album',
  Label = 'label',
  Image = 'image',
  Search = 'search',
  Play = 'play',
  Pause = 'pause',
  Next = 'next',
  Previous = 'previous',
  Shuffle = 'shuffle'
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
  },
  [IpcRoute.Play]: {},
  [IpcRoute.Pause]: {},
  [IpcRoute.Next]: {},
  [IpcRoute.Previous]: {},
  [IpcRoute.Shuffle]: {}
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
  [IpcChannel.Player]: {
    [IpcRoute.Play]: () => void
    [IpcRoute.Pause]: () => void
  }
};

/** Renderer to main (two-way) */
export type IpcInvokeController = {
  [IpcChannel.App]: {
    [IpcRoute.SelectFolders]: () => Promise<string[]>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Cache]: IpcControllerStorage<CacheShape>
  [IpcChannel.Library]: {
    [IpcRoute.Add]: (folders: string[]) => Promise<Library>
    [IpcRoute.Remove]: (payload: string[]) => Promise<Library>
    [IpcRoute.Get]: () => Promise<Library>
    [IpcRoute.Reindex]: (folders: string[]) => Promise<Library>
    [IpcRoute.Rebuild]: () => Promise<Library>
    [IpcRoute.Search]: (query: string) => Promise<Library>
  }
  [IpcChannel.Playlist]: {
    [IpcRoute.Add]: (songs?: string[]) => Promise<Playlist>,
    [IpcRoute.Update]: (playlist: Playlist) => Promise<Playlist[]>
    [IpcRoute.Remove]: (id: string) => Promise<Playlist[]>
    [IpcRoute.Get]: () => Promise<Playlist[]>
  }
};

/** Main to renderer (one-way) */
export type IpcReceiveController = {
  [T in keyof IpcPayloadReceive]: (cb: (payload: IpcPayloadReceive[T]) => void) => () => void
};

export type IpcApi = IpcSendController & IpcInvokeController & {
  [IpcChannel.Receive]: IpcReceiveController
} & {
  dir: {
    thumbs: string
  }
};
