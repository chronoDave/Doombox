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
];

export type IpcChannel =
  'WINDOW' |
  'THEME';
export type IpcAction = typeof IPC_ACTIONS[number];

export interface IpcPayload {
  action: IpcAction
  data?: unknown
  error?: Error
}
