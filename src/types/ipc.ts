import type { Album, Label, Library, Song } from './library';
import type { Playlist } from './playlist';
import type { Shape } from './primitives';
import type { CacheShape } from './shapes/cache.shape';
import type { ThemeShape } from './shapes/theme.shape';
import type { UserShape } from './shapes/user.shape';
import type { BrowserWindow } from 'electron';

export type Event = {
  route: string
  payload: unknown
};

/** Renderer to main (one-way) */
export type ReceiveHandler<T = void> = (
  payload: T,
  window: BrowserWindow | null
) => void;

export type ReceiveController = {
  window: {
    minimize: ReceiveHandler
    maximize: ReceiveHandler
    close: ReceiveHandler
  }
  player: {
    play: ReceiveHandler
    pause: ReceiveHandler
  }
  router: {
    settings: ReceiveHandler
  }
};

/** Renderer to main (two-way) */
export type TransferHandler<T, P> = (
  payload: P,
  window: BrowserWindow | null
) => Promise<T>;

export type StorageTransferController<T extends Shape> = {
  get: TransferHandler<T, void>
  set: TransferHandler<T, T>
};

export type TransferController = {
  os: {
    image: TransferHandler<string, void>
    folders: TransferHandler<string[], void>
  }
  theme: StorageTransferController<ThemeShape>
  user: StorageTransferController<UserShape>
  cache: StorageTransferController<CacheShape>
  library: {
    add: TransferHandler<Library, string[]>
    remove: TransferHandler<Library, string[]>
    select: TransferHandler<Library, string | void>
    reindex: TransferHandler<Library, void>
    rebuild: TransferHandler<Library, void>
  }
  entity: {
    song: TransferHandler<Song, string>
    songs: TransferHandler<Song[], string[]>
    album: TransferHandler<Album, string>
    albums: TransferHandler<Album[], string[]>
    label: TransferHandler<Label, string>
    labels: TransferHandler<Label[], string[]>
  }
  playlist: {
    add: TransferHandler<Playlist, string[]>
    update: TransferHandler<Playlist[], Playlist>
    remove: TransferHandler<Playlist[], string>
    get: TransferHandler<Playlist[], void>
  }
  search: {
    album: TransferHandler<Album, string>
  }
};

/** Main to renderer */
export type SubscriptionController = {
  parser: {
    size: number
    song: string
    image: string
  }
  player: {
    play: void
    pause: void
    next: void
    previous: void
    shuffle: void
  }
};

/** Api */
export type Api = {
  [Channel in keyof ReceiveController]: {
    [Route in keyof ReceiveController[Channel]]: (
      payload: Parameters<ReceiveController[Channel][Route] extends ReceiveHandler ?
        ReceiveController[Channel][Route] :
        never
      >[0]
    ) => void
  }
} & {
  [Channel in keyof TransferController]: {
    [Route in keyof TransferController[Channel]]: (
      payload: TransferController[Channel][Route] extends TransferHandler<infer T, infer K> ?
        K :
        never
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ) => TransferController[Channel][Route] extends TransferHandler<infer T, infer K> ?
      Promise<T> :
      never
  }
} & {
  on: {
    [Channel in keyof SubscriptionController]: {
      [Route in keyof SubscriptionController[Channel]]: (
        subscriber: (payload: SubscriptionController[Channel][Route]) => void
      ) => () => void
    }
  }
};
