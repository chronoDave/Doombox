import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcRead,
  ipcUpdateOne
} from './crud';

export const fetchConfig = () => ipcRead(TYPE.IPC.CONFIG);
export const updateConfigGeneral = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.GENERAL],
  payload
);
export const updateConfigAdvanced = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.ADVANCED],
  payload
);
export const updateConfigDiscord = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.DISCORD],
  payload
);
export const updateConfigKeybind = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.KEYBIND],
  payload
);
export const updateConfigPalette = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.PALETTE],
  payload
);
export const updateConfigLibrary = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.LIBRARY],
  payload
);
export const updateConfigParser = payload => ipcUpdateOne(
  TYPE.IPC.CONFIG,
  [TYPE.CONFIG.PARSER],
  payload
);
