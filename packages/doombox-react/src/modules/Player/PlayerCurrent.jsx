import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { Tooltip } from '../../components/Tooltip';

// Style
import { usePlayerStyle } from './Player.style';

const PlayerCurrent = ({ title, artist }) => {
  const classes = usePlayerStyle();

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

PlayerCurrent.propTypes = {
  artist: PropTypes.string,
  title: PropTypes.string
};

PlayerCurrent.defaultProps = {
  artist: '???',
  title: '???'
};

export default PlayerCurrent;
