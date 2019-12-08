import React from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';

// Core
import { useTheme as useMaterialTheme } from '@material-ui/core/styles';

// Hooks
import { useTheme } from '../../hooks';

// Utils
import { selectFolder } from '../../utils';

const createLibrary = async () => {
  selectFolder()
    .then(filePaths => {
      if (filePaths) {
        // sendIpc(TYPE.IPC.LIBRARY, {
        //   action: ACTION.CRUD.CREATE,
        //   data: { folders: filePaths }
        // });
      }
    })
    .catch(err => console.log(err));
};

const MainSongsPage = () => {
  const { palette: { type } } = useMaterialTheme();
  const { setDarkTheme } = useTheme();

  // sendIpc(TYPE.IPC.LIBRARY, {
  //   action: ACTION.CRUD.READ,
  //   data: {}
  // });

  return (
    <div>
      Main page
      <button onClick={createLibrary}>
        Start scan
      </button>
      <button onClick={() => setDarkTheme(type === 'light' ? true : false)}>
        Toggle darkmode
      </button>
    </div>
  );
};

export default MainSongsPage;
