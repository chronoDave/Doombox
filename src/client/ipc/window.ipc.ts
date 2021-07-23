import { ipcSend } from './ipc';

export const minimize = () => ipcSend('WINDOW', 'MINIMIZE');
export const maximize = () => ipcSend('WINDOW', 'MAXIMIZE');
export const close = () => ipcSend('WINDOW', 'CLOSE');
