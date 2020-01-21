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
  const [collection, setCollection] = useState(null);
  const library = useAudio(HOOK.AUDIO.LIBRARY);

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
        library={library}
        setCollection={setCollection}
      />
      <Box flexGrow={1}>
        {!collection ? (
          <Loader context="library" />
        ) : (
          <VirtualLibrary library={collection} />
        )}
      </Box>
    </Box>
  );
};

export default LibraryPage;
