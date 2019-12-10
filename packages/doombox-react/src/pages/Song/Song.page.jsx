import React from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';

// Core
import { useTheme as useMaterialTheme } from '@material-ui/core/styles';

// Hooks
import { useTheme, useAudio } from '../../hooks';

// Utils
import { selectFolder } from '../../utils';
import { HOOK } from '../../utils/const';

const MainSongsPage = () => {
  const { palette: { type } } = useMaterialTheme();
  const { setDarkTheme } = useTheme();
  const { scanFolders } = useAudio(HOOK.AUDIO.METHOD);

  const createLibrary = async () => {
    selectFolder()
      .then(scanFolders)
      .catch(err => console.log(err));
  };

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
