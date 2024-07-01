import type { Album, Library } from './library';
import type { Playlist } from './playlist';
import type { Shape } from './primitives';
import type { CacheShape } from './shapes/cache.shape';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { BrowserWindow } from 'electron';

export enum IpcChannel {
  App = 'app',
  User = 'user',
  Theme = 'theme',
  Cache = 'cache',
  Window = 'window',
  Library = 'library',
  Receive = 'on',
  Playlist = 'playlist',
  Player = 'player',
  Search = 'search',
  Router = 'router'
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
  Shuffle = 'shuffle',
  Settings = 'settings'
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
export type IpcSendHandler<T = void> = (event: {
  payload: T,
  window: BrowserWindow | null
}) => void;

export type IpcSendController = {
  [IpcChannel.Window]: {
    [IpcRoute.Minimize]: IpcSendHandler
    [IpcRoute.Maximize]: IpcSendHandler
    [IpcRoute.Close]: IpcSendHandler
  }
  [IpcChannel.Player]: {
    [IpcRoute.Play]: IpcSendHandler
    [IpcRoute.Pause]: IpcSendHandler
  }
  [IpcChannel.Router]: {
    [IpcRoute.Settings]: IpcSendHandler
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
  [IpcChannel.Search]: {
    [IpcRoute.Album]: (song: string) => Promise<Album>
  }
};

/** Main to renderer (one-way) */
export type IpcReceiveController = {
  [T in keyof IpcPayloadReceive]: (cb: (payload: IpcPayloadReceive[T]) => void) => () => void
};

export type IpcApi = {
  [Channel in keyof IpcSendController]: {
    [Route in keyof IpcSendController[Channel]]: (
      payload: Parameters<IpcSendController[Channel][Route] extends IpcSendHandler ? IpcSendController[Channel][Route] : never>[0]['payload']
    ) => void
  }
} & IpcInvokeController & {
  [IpcChannel.Receive]: IpcReceiveController
};
