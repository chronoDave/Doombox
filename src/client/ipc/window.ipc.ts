import { ipcInvoke } from './ipc';

export const minimize = () => ipcInvoke('WINDOW', { action: 'MINIMIZE' });
export const maximize = () => ipcInvoke('WINDOW', { action: 'MAXIMIZE' });
export const close = () => ipcInvoke('WINDOW', { action: 'CLOSE' });
