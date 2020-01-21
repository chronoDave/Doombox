import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import {
  IconButtonNext,
  IconButtonPrevious,
  IconButtonPlay,
  IconButtonShuffle,
  Typography,
  SliderPlayer,
  Tooltip,
  Image
} from '../../components';

// Hooks
import {
  useAudio,
  useIpc
} from '../../hooks';

// Utils
import { pathToRemoteUrl } from '../../utils';
import { HOOK } from '../../utils/const';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = () => {
  const [image, setImage] = useState({});

  const classes = usePlayerStyles();

  const { metadata, images } = useAudio(HOOK.AUDIO.CURRENT);
  const { getImageById } = useIpc(HOOK.IPC.METHOD);
  const { t } = useTranslation();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (images) {
      const imageData = getImageById(images[0]);

      setImage(imageData);
      if ('mediaSession' in navigator) {
        pathToRemoteUrl(imageData.path)
          .then(src => {
            navigator.mediaSession.artwork = [{ src }];
          });
      }
    }
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
        color={isDarkTheme ? 'text.primary' : 'grey.50'}
        pt={1}
      >
        {!metadata ? (
          <Typography>
            {t('description:song', { context: 'none' })}
          </Typography>
        ) : (
          <Fragment>
            <Tooltip
              placement="right"
              title={metadata.title}
              interactive
            >
              <Typography align="center" clamp={2}>
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
                clamp={1}
                variant="body2"
              >
                {metadata.artist}
              </Typography>
            </Tooltip>
          </Fragment>
        )}
      </Box>
      <Box>
        <SliderPlayer />
        <Box
          display="flex"
          justifyContent="space-around"
          color={isDarkTheme ? 'text.primary' : 'grey.50'}
        >
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
