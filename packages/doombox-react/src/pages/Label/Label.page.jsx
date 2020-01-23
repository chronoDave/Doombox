import React, { useState } from 'react';

// Core
import { Box } from '@material-ui/core';

import {
  BackgroundAlbum,
  Loader
} from '../../components';

import {
  VirtualLabel,
  MenuLabel
} from '../../modules';


const LabelPage = () => {
  const [labels, setLabels] = useState(null);

  const renderAlbums = () => {
    if (!labels) return <Loader context="library" />;
    if (labels.length === 0) return 'No albums found';
    return <VirtualLabel labels={labels} />;
  };

  return (
    <Box
      pl="1px"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <BackgroundAlbum />
      <MenuLabel setLabels={setLabels} />
      <Box flexGrow={1}>
        {renderAlbums()}
      </Box>
    </Box>
  );
};

export default LabelPage;
