import React, { useEffect } from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';

// Actions
import { sendIpc } from '../../actions';

// Hooks
import { useLibrary } from '../../hooks/useContext';

// Utils
import { selectFolder } from '../../utils';
import { HOOK } from '../../utils/const';

const createLibrary = async () => {
  selectFolder()
    .then(filePaths => {
      if (filePaths) {
        sendIpc(
          TYPE.IPC.LIBRARY,
          { action: ACTION.CRUD.CREATE, data: { folders: filePaths } }
        );
      }
    })
    .catch(err => console.log(err));
};

const MainSongsPage = () => {
  const songs = useLibrary(HOOK.LIBRARY.SONG);

  console.log(songs);

  return (
    <div>
      Main page
      <button onClick={createLibrary}>
        Start scan
      </button>
    </div>
  );
};

export default MainSongsPage;
