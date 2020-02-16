import React from 'react';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
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
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = ({ darkTheme }) => {
  const classes = usePlayerStyles();

  const { metadata, images } = useAudio(HOOK.AUDIO.CURRENT);
  const { t } = useTranslation();

  return (
    <Image
      className={classes.image}
      src={images && images[0].file}
      alt={images && images[0].picture}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        color={darkTheme ? 'text.primary' : 'grey.50'}
        pt={1}
      >
        {!metadata ? (
          <Typography>
            {t('description:song', { context: 'none' })}
          </Typography>
        ) : (
          <Tooltip
            placement="right"
            title={`(${metadata.album}) ${metadata.artist} - ${metadata.title}`}
            interactive
          >
            <Box display="flex" flexDirection="column">
              <Typography align="center" clamp={2}>
                {metadata.title}
              </Typography>
              <Typography
                align="center"
                clamp={1}
                variant="body2"
              >
                {metadata.artist}
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box>
        <SliderPlayer />
        <Box
          display="flex"
          justifyContent="space-around"
          color={darkTheme ? 'text.primary' : 'grey.50'}
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

Player.propTypes = {
  darkTheme: PropTypes.bool
};

Player.defaultProps = {
  darkTheme: false
};

const mapStateToProps = state => ({
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme
});

export default connect(
  mapStateToProps
)(Player);
