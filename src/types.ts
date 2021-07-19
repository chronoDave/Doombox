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

export type IpcChannel =
  'WINDOW' |
  'THEME';
export type IpcAction = typeof IPC_ACTIONS[number];

export interface IpcPayload<T = unknown> {
  action: IpcAction
  data?: T
  error?: Error
}
