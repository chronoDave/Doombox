import React, { Fragment, useMemo } from 'react';

// Icon
import IconImage from '@material-ui/icons/Image';

// Core
import {
  Box,
  Slider
} from '@material-ui/core';

import { useAudio } from '../../components/Provider';
import { Tooltip } from '../../components/Tooltip';
import { Typography } from '../../components/Typography';

// Utils
import { formatTime, cleanUrl } from '../../utils';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarPlayer = () => {
  const {
    image: { path },
    current: { title, artist, album },
    position,
    duration,
    seek,
    requestFrame
  } = useAudio();
  const classes = useSidebarStyle();

  return (
    <Box
      p={1}
      pt={1.5}
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Box display="flex">
        {useMemo(() => (
          <Fragment>
            {path ? (
              <img
                src={cleanUrl(path)}
                alt={`${album || '???'} album cover`}
                className={classes.img}
              />
            ) : (
              <Box
                width={60}
                height={60}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="grey.500"
                borderRadius="borderRadius"
              >
                <IconImage />
              </Box>
            )}
            <Box
              maxWidth={96}
              pl={1}
              pt={0.5}
              display="flex"
              flexDirection="column"
            >
              <Tooltip
                interactive
                placement="right"
                title={title || '???'}
              >
                <Typography variant="subtitle2" noWrap>
                  {title || '???'}
                </Typography>
              </Tooltip>
              <Tooltip
                interactive
                placement="right"
                title={artist || '???'}
              >
                <Typography variant="caption" noWrap>
                  {artist || '???'}
                </Typography>
              </Tooltip>
            </Box>
          </Fragment>
        ), [path, title, album, artist])}
      </Box>
      {useMemo(() => (
        <Box display="flex" flexDirection="column">
          <Slider
            value={position || 0}
            max={duration || 100}
            classes={{
              root: classes.sliderRoot,
              thumb: classes.sliderThumb,
              valueLabel: classes.sliderValueLabel
            }}
            onChange={(event, value) => seek(value)}
            onChangeCommitted={() => requestFrame()}
            valueLabelDisplay="auto"
            valueLabelFormat={value => formatTime(value || 0)}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">
              {formatTime(Math.round(position) || 0)}
            </Typography>
            <Typography variant="caption">
              {`-${formatTime(Math.round(duration) - Math.round(position) || 0)}`}
            </Typography>
          </Box>
        </Box>
      ), [position, duration])}
    </Box>
  );
};

export default SidebarPlayer;
