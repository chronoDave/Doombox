import React from 'react';
import { connect } from 'react-redux';
import { TYPE } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconNext from '@material-ui/icons/SkipNext';
import IconPrevious from '@material-ui/icons/SkipPrevious';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  IconButtonPlay,
  Typography,
  SliderPlayer,
  Tooltip,
  Image
} from '../../components';

// Redux
import { shuffleMixtape } from '../../redux';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { normalizeArtist } from '../../utils';
import { HOOK } from '../../utils/const';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = ({ darkTheme, localized, shuffle }) => {
  const classes = usePlayerStyles();

  const { next, previous } = useAudio(HOOK.AUDIO.METHOD);
  const { metadata, images } = useAudio(HOOK.AUDIO.CURRENT);

  const { t } = useTranslation();

  const renderMetadata = () => {
    if (metadata) {
      const normalizedArtist = normalizeArtist({
        localized,
        artist: metadata.artist,
        artists: metadata.artists,
        artistlocalized: metadata.artistlocalized,
        artistslocalized: metadata.artistslocalized
      });
      const album = localized ? (metadata.albumlocalized || metadata.album) : metadata.album;
      const title = localized ? (metadata.titlelocalized || metadata.title) : metadata.title;

      return (
        <Tooltip
          placement="right"
          title={`(${album}) ${normalizedArtist} - ${title}`}
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
              {normalizedArtist}
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
          <IconButton className={classes.iconButton} onClick={previous}>
            <IconPrevious />
          </IconButton>
          <IconButtonPlay className={classes.iconButton} />
          <IconButton className={classes.iconButton} onClick={next}>
            <IconNext />
          </IconButton>
          <IconButton className={classes.iconButton} onClick={() => shuffle()}>
            <IconShuffle />
          </IconButton>
        </Box>
      </Box>
    </Image>
  );
};

Player.propTypes = {
  localized: PropTypes.bool.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  shuffle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  localized: state.config[TYPE.CONFIG.GENERAL].localized,
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme
});

const dispatchMapToProps = {
  shuffle: shuffleMixtape
};

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(Player);
