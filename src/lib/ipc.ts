export const IPC_ACTIONS = [
  'ERROR',
  'INSERT',
  'FIND',
  'FIND_BY_ID',
  'UPDATE',
  'UPDATE_BY_ID',
  'DELETE',
  'DELETE_BY_ID',
  'DROP',
  'MINIMIZE',
  'MAXIMIZE',
  'CLOSE'
] as const;

export const IPC_CHANNELS = [
  'WINDOW',
  'THEME'
] as const;

export type IpcAction = typeof IPC_ACTIONS[number];
export type IpcChannel = typeof IPC_CHANNELS[number];
export type IpcController<T> = Partial<Record<IpcAction, (payload: IpcPayload) => Promise<T>>>;
export type IpcPayload<T = unknown> = {
  action: IpcAction,
  data?: T,
  error?: Error
};

export default class Ipc {
  private static isObject(x: unknown): x is Partial<IpcPayload> {
    return x !== null && !Array.isArray(x) && typeof x === 'object';
  }

  private static isPayload(x: Partial<IpcPayload>): x is IpcPayload {
    return !!x.action && IPC_ACTIONS.includes(x.action);
  }

  static route<T>(controller: IpcController<T>, payload: unknown): Promise<T> {
    try {
      if (!this.isObject(payload)) {
        return Promise.reject(new Error(`Payload must be an object: ${JSON.stringify(payload)}`));
      }
      if (!this.isPayload(payload)) {
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
