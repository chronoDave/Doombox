import React, { useMemo } from 'react';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import { Box } from '@material-ui/core';

import { useAudio } from '../../Audio';

const SidebarPlayerCover = () => {
  const { image } = useAudio();

  return useMemo(() => (
    <Box
      width={60}
      height={60}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.500"
      borderRadius="borderRadius"
    >
      {image.file ? (
        <img
          width={60}
          height={60}
          src={image.file ? `file://${image.file}` : null}
          alt="Album cover"
        />
      ) : (
        <IconImage />
      )}
    </Box>
  ), [image]);
};

export default SidebarPlayerCover;
