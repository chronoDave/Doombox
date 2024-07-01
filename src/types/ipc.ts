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
export type IpcInvokeHandler<P, T> = (event: {
  payload: T,
  window: BrowserWindow | null
}) => Promise<P>;

export type IpcControllerStorage<T extends Shape> = {
  [IpcRoute.Get]: IpcInvokeHandler<T, void>
  [IpcRoute.Set]: IpcInvokeHandler<T, T>
};

export type IpcInvokeController = {
  [IpcChannel.App]: {
    [IpcRoute.SelectFolders]: IpcInvokeHandler<string[], void>
  }
  [IpcChannel.Theme]: IpcControllerStorage<ThemeShape>
  [IpcChannel.User]: IpcControllerStorage<UserShape>
  [IpcChannel.Cache]: IpcControllerStorage<CacheShape>
  [IpcChannel.Library]: {
    [IpcRoute.Add]: IpcInvokeHandler<Library, string[]>
    [IpcRoute.Remove]: IpcInvokeHandler<Library, string[]>
    [IpcRoute.Get]: IpcInvokeHandler<Library, void>
    [IpcRoute.Reindex]: IpcInvokeHandler<Library, string[]>
    [IpcRoute.Rebuild]: IpcInvokeHandler<Library, void>
    [IpcRoute.Search]: IpcInvokeHandler<Library, string>
  }
  [IpcChannel.Playlist]: {
    [IpcRoute.Add]: IpcInvokeHandler<Playlist, string[]>
    [IpcRoute.Update]: IpcInvokeHandler<Playlist[], Playlist>
    [IpcRoute.Remove]: IpcInvokeHandler<Playlist[], string>
    [IpcRoute.Get]: IpcInvokeHandler<Playlist[], void>
  }
  [IpcChannel.Search]: {
    [IpcRoute.Album]: IpcInvokeHandler<Album, string>
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
} & {
  [Channel in keyof IpcInvokeController]: {
    [Route in keyof IpcInvokeController[Channel]]: (
      payload: IpcInvokeController[Channel][Route] extends IpcInvokeHandler<infer T, infer K> ?
        K :
        never
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ) => IpcInvokeController[Channel][Route] extends IpcInvokeHandler<infer T, infer K> ?
      Promise<T> :
      never
  }
} & {
  [IpcChannel.Receive]: IpcReceiveController
};
