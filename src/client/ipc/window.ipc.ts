import { ipcSend } from './ipc';

export const minimize = () => ipcSend('WINDOW', { action: 'MINIMIZE' });
export const maximize = () => ipcSend('WINDOW', { action: 'MAXIMIZE' });
export const close = () => ipcSend('WINDOW', { action: 'CLOSE' });
