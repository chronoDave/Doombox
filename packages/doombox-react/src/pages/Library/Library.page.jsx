import React, { useState } from 'react';

// Core
import { Box } from '@material-ui/core';

import {
  BackgroundAlbum,
  Loader
} from '../../components';

// Modules
import {
  VirtualLibrary,
  MenuLibrary
} from '../../modules';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const LibraryPage = () => {
  const [library, setLibrary] = useState(null);
  const collection = useAudio(HOOK.AUDIO.LIBRARY);

  return (
    <Box
      pl="1px"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <BackgroundAlbum />
      <MenuLibrary
        collection={collection}
        setLibrary={setLibrary}
      />
      <Box flexGrow={1}>
        {!library ? (
          <Loader context="library" />
        ) : (
          <VirtualLibrary library={library} />
        )}
      </Box>
    </Box>
  );
};

export default LibraryPage;
