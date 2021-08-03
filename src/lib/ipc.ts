export const IPC_ACTIONS = {
  CRUD: [
    'INSERT',
    'FIND',
    'FIND_BY_ID',
    'UPDATE',
    'UPDATE_BY_ID',
    'DELETE',
    'DELETE_BY_ID',
    'DROP',
  ],
  CACHE: [
    'GET',
    'MUTE',
    'VOLUME'
  ],
  THEME: [
    'GET',
  ],
  WINDOW: [
    'MINIMIZE',
    'MAXIMIZE',
    'CLOSE',
  ],
  REPORTER: [
    'ERROR',
    'WARN',
    'LOG',
  ]
} as const;

export type IpcChannel = keyof typeof IPC_ACTIONS;
export type IpcAction<T extends IpcChannel> = typeof IPC_ACTIONS[T][number];

export type IpcPayload<T extends IpcChannel, P = unknown> = {
  action: IpcAction<T>,
  data: P,
  error?: Error
};

export type IpcController<T extends IpcChannel> =
  Record<IpcAction<T>, (payload: IpcPayload<T>) => Promise<unknown>>;

export default class Ipc {
  private static isObject<T extends IpcChannel>(x: unknown): x is Partial<IpcPayload<T>> {
    return x !== null && !Array.isArray(x) && typeof x === 'object';
  }

  private static isPayload<T extends IpcChannel>(x: Partial<IpcPayload<T>>): x is IpcPayload<T> {
    return !!x.action;
  }

  static isValid<T extends IpcChannel, P = unknown>(x: unknown): x is IpcPayload<T, P> {
    return this.isObject(x) && this.isPayload(x);
  }

  static route<T extends IpcChannel>(controller: IpcController<T>, payload: unknown): Promise<unknown> {
    try {
      if (!this.isObject<T>(payload)) {
        return Promise.reject(new Error(`Payload must be an object: ${JSON.stringify(payload)}`));
      }
      if (!this.isPayload<T>(payload)) {
        return Promise.reject(new Error(`Invalid payload action: ${JSON.stringify(payload.action)}`));
      }

      const route = controller[payload.action];
      if (!route) return Promise.reject(new Error(`Missing route: ${payload.action}`));

      return route(payload);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
