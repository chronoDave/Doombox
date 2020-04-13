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

const Player = ({ darkTheme, localized }) => {
  const classes = usePlayerStyles();

  const { metadata, images } = useAudio(HOOK.AUDIO.CURRENT);
  const { t } = useTranslation();

  const renderMetadata = () => {
    if (metadata) {
      const album = localized ? (metadata.albumlocalized || metadata.album) : metadata.album;
      const artist = localized ? (metadata.artistlocalized || metadata.artist) : metadata.artist;
      const title = localized ? (metadata.titlelocalized || metadata.title) : metadata.title;

      return (
        <Tooltip
          placement="right"
          title={`(${album}) ${artist} - ${title}`}
          interactive
        >
          <Box display="flex" flexDirection="column">
            <Typography align="center" clamp={2}>
              {title}
            </Typography>
            <Typography
              align="center"
              clamp={1}
              variant="body2"
            >
              {artist}
            </Typography>
          </Box>
        </Tooltip>
      );
    }
    return (
      <Typography>
        {t('description:song', { context: 'none' })}
      </Typography>
    );
  };

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
        {renderMetadata()}
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
  localized: PropTypes.bool.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  localized: state.config[TYPE.CONFIG.GENERAL].localized,
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme
});

export default connect(
  mapStateToProps
)(Player);
