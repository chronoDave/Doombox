import { contextBridge } from 'electron';

import type { ElectronApi } from '../types';

const electronApi: ElectronApi = {

};

contextBridge.exposeInMainWorld('electronApi', electronApi);
