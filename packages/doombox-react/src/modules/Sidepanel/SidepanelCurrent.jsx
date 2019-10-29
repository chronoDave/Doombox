import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { Tooltip } from '../../components/Tooltip';

// Style
import { useSidepanelStyle } from './Sidepanel.style';

const SidepanelCurrent = ({ title, artist }) => {
  const classes = useSidepanelStyle();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Tooltip
        interactive
        placement="right"
        title={title}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          className={classes.noWrap}
        >
          {title}
        </Typography>
      </Tooltip>
      <Tooltip
        interactive
        placement="right"
        title={artist}
      >
        <Typography
          align="center"
          className={classes.noWrap}
        >
          {artist}
        </Typography>
      </Tooltip>
    </Box>
  );
};

SidepanelCurrent.propTypes = {
  artist: PropTypes.string,
  title: PropTypes.string
};

SidepanelCurrent.defaultProps = {
  artist: '???',
  title: '???'
};

export default SidepanelCurrent;
