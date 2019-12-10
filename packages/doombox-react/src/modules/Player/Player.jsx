import React, {
  Fragment,
  useState,
  useEffect
} from 'react';

// Core
import {
  Typography,
  Tooltip,
  Box
} from '@material-ui/core';

import {
  IconButtonNext,
  IconButtonPrevious,
  IconButtonPlay,
  IconButtonShuffle,
  SliderPlayer,
  Image
} from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = () => {
  const [image, setImage] = useState({});

  const classes = usePlayerStyles();

  const { metadata, images } = useAudio(HOOK.AUDIO.METADATA);
  const { getImage } = useAudio(HOOK.AUDIO.METHOD);

  useEffect(() => {
    if (images) setImage(getImage(images[0]));
  }, [images]);

  return (
    <Image
      className={classes.image}
      src={image.path}
      alt={image.picture}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {!metadata ? (
          <Typography>
            No song selected
          </Typography>
        ) : (
          <Fragment>
            <Tooltip
              placement="right"
              title={metadata.title}
              interactive
            >
              <Typography
                align="center"
                className={classes.noWrap}
              >
                {metadata.title}
              </Typography>
            </Tooltip>
            <Tooltip
              placement="right"
              title={metadata.artist}
              interactive
            >
              <Typography
                align="center"
                className={classes.noWrap}
              >
                {metadata.artist}
              </Typography>
            </Tooltip>
          </Fragment>
        )}
      </Box>
      <Box>
        <SliderPlayer />
        <Box display="flex" justifyContent="space-around">
          <IconButtonPrevious className={classes.iconButton} />
          <IconButtonPlay className={classes.iconButton} />
          <IconButtonNext className={classes.iconButton} />
          <IconButtonShuffle className={classes.iconButton} />
        </Box>
      </Box>
    </Image>
  );
};

export default Player;
