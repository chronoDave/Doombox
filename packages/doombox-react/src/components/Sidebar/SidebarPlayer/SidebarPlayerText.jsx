import React, { useMemo } from 'react';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { useAudio } from '../../Audio';

const SidebarPlayerText = () => {
  const { current } = useAudio();

  return useMemo(() => (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={96}
      pl={1}
      pt={0.5}
    >
      <Tooltip
        interactive
        placement="right"
        title={current.TIT2 || '???'}
      >
        <Typography variant="subtitle2" noWrap>
          {current.TIT2 || '???'}
        </Typography>
      </Tooltip>
      <Tooltip
        interactive
        placement="right"
        title={current.TPE1 || '???'}
      >
        <Typography variant="caption" noWrap>
          {current.TPE1 || '???'}
        </Typography>
      </Tooltip>
    </Box>
  ), [current]);
};

export default SidebarPlayerText;
