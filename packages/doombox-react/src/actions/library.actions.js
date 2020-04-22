import {
  TYPE,
  ACTION
} from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcUpdate,
  ipcDelete
} from './crud';

export const appendLibrary = folders => ipcCreate(TYPE.IPC.LIBRARY, folders);
export const fetchLibrary = () => ipcRead(TYPE.IPC.LIBRARY);
export const searchLibrary = (regex = null, sort = null) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    regex,
    sort
  }
);
export const playLibrary = ({
  name = null,
  query = null,
  regex = null,
  sort = {
    'metadata.disk.no': 1,
    'metadata.track.no': 1
  }
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.SET,
    query,
    regex,
    sort
  },
  { name }
);
export const addLibrary = ({
  query = null,
  regex = null,
  sort = {
    'metadata.disk.no': 1,
    'metadata.track.no': 1
  }
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.ADD,
    query,
    regex,
    sort
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
export const dropLibrary = () => ipcDelete(TYPE.IPC.LIBRARY);
