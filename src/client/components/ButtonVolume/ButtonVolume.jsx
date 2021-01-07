import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { ButtonIcon } from '../ButtonIcon';
import { Popper } from '../Popper';
import { Slider } from '../Slider';
import { Typography } from '../Typography';

// Actions
import { updateCache } from '../../actions';

// Hooks
import { useAudio, useTimeoutOpen } from '../../hooks';

// Styles
import useButtonVolumeStyles from './ButtonVolume.styles';

const ButtonVolume = props => {
  const {
    volume,
    muted,
    dispatch,
    ...rest
  } = props;
  const ref = useRef(null);

  const { mute, setVolume } = useAudio();
  const { open, handleEnter, handleLeave } = useTimeoutOpen();
  const classes = useButtonVolumeStyles();

  const throttledSetVolume = throttle(setVolume, 100);

  const getIcon = () => {
    if (muted) return 'mute';
    if (volume === 0) return 'volumeLow';
    if (volume === 1) return 'volumeHigh';
    return 'volumeMedium';
  };

  const handleWheel = event => throttledSetVolume(
    event.deltaY > 0 ?
      volume - 0.03 :
      volume + 0.03
  );

  return (
    <Fragment>
      <ButtonIcon
        {...rest}
        icon={getIcon()}
        ref={ref}
        onClick={mute}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onWheel={handleWheel}
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
          onDrag={(_, newVolume) => throttledSetVolume(newVolume)}
          onDragEnd={(_, newVolume) => updateCache('player.volume', newVolume)}
          onClick={(_, newVolume) => {
            throttledSetVolume(newVolume);
            updateCache('player.volume', newVolume);
          }}
          onWheel={handleWheel}
        />
        <Typography>
          {Math.round(volume * 100)}
        </Typography>
      </Popper>
    </Fragment>
  );
};

ButtonVolume.propTypes = {
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
)(ButtonVolume);
