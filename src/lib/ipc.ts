export const IPC_ACTIONS = [
  'GET',
  'SET',
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
  'CLOSE',
] as const;
export type IpcAction = typeof IPC_ACTIONS[number];

export type IpcChannel =
  'WINDOW' |
  'THEME';

export type IpcController<T = unknown> = Partial<Record<IpcAction, (payload: IpcPayload) => Promise<T>>>;
export type IpcPayload<T = unknown> = {
  action: IpcAction,
  data: T,
  error?: Error
};

export default class Ipc {
  private static isObject(x: unknown): x is Partial<IpcPayload> {
    return x !== null && !Array.isArray(x) && typeof x === 'object';
  }

  private static isPayload(x: Partial<IpcPayload>): x is IpcPayload {
    return !!x.action && IPC_ACTIONS.includes(x.action);
  }

  static validate<T = unknown>(x: unknown): x is IpcPayload<T> {
    return this.isObject(x) && this.isPayload(x);
  }

  static route(controller: IpcController, payload: unknown): Promise<unknown> {
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
