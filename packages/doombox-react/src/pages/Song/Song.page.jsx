import React from 'react';

// Core
import { useTheme as useMaterialTheme } from '@material-ui/core/styles';

// Actions
import { scanFolders } from '../../actions';

// Hooks
import { useTheme } from '../../hooks';

// Utils
import { selectFolder } from '../../utils';

const MainSongsPage = () => {
  const { palette: { type } } = useMaterialTheme();
  const { setDarkTheme } = useTheme();

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
