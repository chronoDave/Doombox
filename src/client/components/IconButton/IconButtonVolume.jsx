import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Icons
import IconVolumeOff from '@material-ui/icons/VolumeOff';
import IconVolumeLow from '@material-ui/icons/VolumeMute';
import IconVolumeMedium from '@material-ui/icons/VolumeDown';
import IconVolumeHigh from '@material-ui/icons/VolumeUp';

// Core
import {
  Typography,
  Popper,
  Fade,
  Paper,
  Slider
} from '@material-ui/core';

// Actions
import { updateCache } from '../../actions';

// Hooks
import { useAudio, useHover } from '../../hooks';

// Styles
import { useIconButtonStyles } from './IconButton.style';

import IconButton from './IconButton';

const IconButtonVolume = props => {
  const {
    volume,
    muted,
    dispatch,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const { mute, setVolume } = useAudio();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });
  const classes = useIconButtonStyles();

  const renderIcon = () => {
    if (muted) return <IconVolumeOff />;
    if (volume === 0) return <IconVolumeLow />;
    if (volume === 1) return <IconVolumeHigh />;
    return <IconVolumeMedium />;
  };

  const id = 'iconButtonVolume';
  const throttledSetVolume = throttle((event, newVolume) => setVolume(newVolume), 100);

  return (
    <Fragment>
      <IconButton
        {...rest}
        aria-describedby={id}
        ref={ref}
        onClick={mute}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {renderIcon()}
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={ref.current}
        transition
        placement="top"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              classes={{ root: classes.volumePaperRoot }}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <Slider
                orientation="vertical"
                max={1}
                step={0.01}
                value={volume}
                classes={{ root: classes.volumeSliderRoot }}
                onChange={throttledSetVolume}
                onChangeCommitted={(event, newVolume) => updateCache('player.volume', newVolume)}
              />
              <Typography variant="caption">
                {Math.round(volume * 100)}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};

IconButtonVolume.propTypes = {
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  muted: state.player.muted,
  volume: state.player.volume
});

export default connect(
  mapStateToProps
)(IconButtonVolume);
