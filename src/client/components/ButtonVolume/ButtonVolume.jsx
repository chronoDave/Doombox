import React, { Fragment, useState, useRef } from 'react';
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
import { useAudio, useHover } from '../../hooks';

// Styles
import useButtonVolumeStyles from './ButtonVolume.styles';

const ButtonVolume = props => {
  const {
    volume,
    muted,
    dispatch,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const classes = useButtonVolumeStyles();
  const { mute, setVolume } = useAudio();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });

  const id = 'buttonVolume';
  const throttledSetVolume = throttle(newVolume => setVolume(newVolume), 100);

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
        aria-describedby={id}
        ref={ref}
        onClick={mute}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onWheel={handleWheel}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={ref.current}
        placement="top-start"
      >
        <div
          className={classes.menu}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <Slider
            value={volume}
            max={1}
            vertical
            onDrag={(_, newVolume) => throttledSetVolume(newVolume)}
            onDragEnd={(event, newVolume) => updateCache('player.volume', newVolume)}
            onWheel={handleWheel}
          />
          <Typography>
            {Math.round(volume * 100)}
          </Typography>
        </div>
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
