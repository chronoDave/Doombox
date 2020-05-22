import {
  TYPE,
  ACTION
} from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcUpdate,
  ipcDelete,
  ipcDrop
} from './crud';

export const appendLibrary = folders => ipcCreate(TYPE.IPC.LIBRARY, folders);
export const fetchLibrary = () => ipcRead(TYPE.IPC.LIBRARY);
export const searchLibrary = (regex = null) => ipcRead(TYPE.IPC.LIBRARY, { regex });
export const playLibrary = ({
  name = null,
  query = null,
  regex = null
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.SET,
    query,
    regex
  },
  { name }
);
export const addLibrary = ({
  query = null,
  regex = null
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.ADD,
    query,
    regex
  }
);
export const updateFolders = folders => ipcUpdate(
  TYPE.IPC.LIBRARY,
  { query: folders }
);
export const deleteFolders = ({ query, regex }) => ipcDelete(
  TYPE.IPC.LIBRARY,
  { query, regex }
);
export const dropLibrary = () => ipcDrop(TYPE.IPC.LIBRARY);
