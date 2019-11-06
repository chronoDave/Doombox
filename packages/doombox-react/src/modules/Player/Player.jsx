import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { PaperImage } from '../../components/Paper';

import PlayerCurrent from './PlayerCurrent';
import PlayerProgress from './PlayerProgress';
import PlayerButtons from './PlayerButtons';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

// Style
import { usePlayerStyle } from './Player.style';

const Player = () => {
  const { current, image } = useAudio(AUDIO_HOOKS.CURRENT);
  const { t } = useTranslation();
  const classes = usePlayerStyle();

  return (
    <PaperImage
      classes={{ root: classes.paperRoot }}
      path={image ? image.path : null}
      elevation={2}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        py={2}
        px={3}
      >
        <Box flexGrow={1} display="flex" alignItems="center">
          {!current ? (
            <Typography>
              {t('description:noSongSelected')}
            </Typography>
          ) : (
            <PlayerCurrent
              artist={current.artist}
              title={current.title}
            />
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <PlayerProgress />
          <PlayerButtons />
        </Box>
      </Box>
    </PaperImage>
  );
};

export default Player;
