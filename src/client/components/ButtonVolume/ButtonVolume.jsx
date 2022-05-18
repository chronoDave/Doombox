import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { clamp } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import {
  ButtonIcon,
  Popper,
  Slider,
  Typography
} from '..';

// Hooks
import { useAudio, useTimeoutOpen } from '../../hooks';

// Styles
import useButtonVolumeStyles from './ButtonVolume.styles';

const ButtonVolume = props => {
  const {
    volume,
    muted,
    small,
    className
  } = props;
  const ref = useRef();

  const { mute, setVolume } = useAudio();
  const { open, handleEnter, handleLeave } = useTimeoutOpen();
  const classes = useButtonVolumeStyles();

  const getIcon = () => {
    if (muted) return 'mute';
    if (volume === 0) return 'volumeLow';
    if (volume === 1) return 'volumeHigh';
    return 'volumeMedium';
  };

  const handleVolume = newVolume => newVolume !== volume && setVolume(newVolume);
  const handleWheel = event => {
    const value = event.shiftKey ? 0.01 : 0.05;
    const newValue = event.deltaY > 0 ?
      volume - value :
      volume + value;
    const newVolume = clamp(0, 1, newValue);

    handleVolume(newVolume);
  };

  return (
    <Fragment>
      <ButtonIcon
        icon={getIcon()}
        ref={ref}
        onClick={mute}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onWheel={handleWheel}
        small={small}
        className={className}
      />
      <Popper
        open={open}
        anchorEl={ref.current}
        placement="top-start"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={classes.popper}
      >
        <Slider
          value={volume}
          max={1}
          orientation="vertical"
          onDragEnd={(_, newVolume) => handleVolume(newVolume)}
          onClick={(_, newVolume) => handleVolume(newVolume)}
          onWheel={handleWheel}
        />
        <Typography>
          {Math.round(volume * 100)}
        </Typography>
      </Popper>
    </Fragment>
  );
};

ButtonVolume.defaultProps = {
  small: false,
  className: null
};

ButtonVolume.propTypes = {
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  small: PropTypes.bool,
  className: PropTypes.string
};

const mapStateToProps = state => ({
  muted: state.player.muted,
  volume: state.player.volume
});

export default connect(
  mapStateToProps
)(ButtonVolume);
