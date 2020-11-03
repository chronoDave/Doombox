import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { Icon } from '../Icon';
import { Popper } from '../Popper';
import { Slider } from '../Slider';
import { Typography } from '../Typography';

// Actions
import { updateCache } from '../../actions';

// Hooks
import { useAudio, useHover } from '../../hooks';

// Styles
import useIconButtonStyles from './IconButton.style';

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
    if (muted) return <Icon type="mute" />;
    if (volume === 0) return <Icon type="volumeLow" />;
    if (volume === 1) return <Icon type="volumeHigh" />;
    return <Icon type="volumeMedium" />;
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
            onDrag={throttledSetVolume}
            onDragEnd={(event, newVolume) => updateCache('player.volume', newVolume)}
          />
          <Typography>
            {Math.round(volume * 100)}
          </Typography>
        </div>
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
