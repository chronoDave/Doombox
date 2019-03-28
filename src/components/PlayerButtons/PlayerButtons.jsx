import React from 'react';
import PropTypes from 'prop-types';

// Icons
import PreviousIcon from '@material-ui/icons/SkipPrevious';
import NextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import VolumeLevel0Icon from '@material-ui/icons/VolumeOff';
import VolumeLevel1Icon from '@material-ui/icons/VolumeMute';
import VolumeLevel2Icon from '@material-ui/icons/VolumeDown';
import VolumeLevel3Icon from '@material-ui/icons/VolumeUp';

// Experimental
import Slider from '@material-ui/lab/Slider';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { GridContainer } from '../Grid';
import { ButtonPopover } from '../Button';

// Style
import PlayerButtonsStyle from './PlayerButtonsStyle';

const PlayerButtons = props => {
  const {
    volume,
    playing,
    onVolumeChange,
    onPrevious,
    onPlay,
    onNext,
    classes
  } = props;

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeLevel0Icon fontSize="inherit" />;
    if (volume > 0 && volume <= 33) return <VolumeLevel1Icon fontSize="inherit" />;
    if (volume > 33 && volume <= 66) return <VolumeLevel2Icon fontSize="inherit" />;
    return <VolumeLevel3Icon fontSize="inherit" />;
  };

  return (
    <GridContainer
      wrap="nowrap"
      justify="space-between"
      classes={{ root: classes.root }}
    >
      <IconButton
        onClick={onPrevious}
        color="inherit"
      >
        <PreviousIcon />
      </IconButton>
      <IconButton
        onClick={onPlay}
        color="inherit"
      >
        {playing
          ? <PlayIcon />
          : <PauseIcon />
        }
      </IconButton>
      <IconButton
        onClick={onNext}
        color="inherit"
      >
        <NextIcon />
      </IconButton>
      <ButtonPopover
        popover={(
          <GridContainer
            direction="column"
            wrap="nowrap"
            justify="center"
            alignItems="center"
          >
            <Typography
              color="textPrimary"
              variant="caption"
            >
              {volume}
            </Typography>
            <Slider
              vertical
              value={volume}
              onChange={onVolumeChange}
            />
          </GridContainer>
        )}
        anchorOriginVertical="top"
        anchorOriginHorizontal="center"
        transformOriginVertical="bottom"
        transformOriginHorizontal="center"
        className={classes.volumeContainer}
      >
        <div className={classes.volumeIcon}>
          {getVolumeIcon()}
        </div>
        <Typography
          variant="caption"
          color="textSecondary"
        >
          {volume}
        </Typography>
      </ButtonPopover>
    </GridContainer>
  );
};

PlayerButtons.propTypes = {
  volume: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(PlayerButtonsStyle)(PlayerButtons);
