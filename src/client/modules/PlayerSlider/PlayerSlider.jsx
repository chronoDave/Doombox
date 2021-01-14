import React, { useEffect } from 'react';
import { STATUS } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Slider } from '../../components';

// Hooks
import { useAudio, useTimer } from '../../hooks';

// Redux
import { setSliding } from '../../redux';

// Styles
import usePlayerSliderStyles from './PlayerSlider.styles';

const PlayerSlider = props => {
  const {
    position,
    duration,
    status,
    dispatchSliding
  } = props;
  const { seek, getPosition } = useAudio();
  const [current, create, destroy] = useTimer(position);
  const classes = usePlayerSliderStyles();

  useEffect(() => {
    if (status === STATUS.AUDIO.PLAYING) {
      create();
    } else {
      destroy();
    }
  }, [status, create, destroy]);

  return (
    <div className={classes.root}>
      <Slider
        value={current}
        max={duration}
        onDrag={(_, newPos) => seek(newPos)}
        onDragStart={() => dispatchSliding(true)}
        onDragEnd={() => {
          dispatchSliding(false);
          getPosition();
        }}
        onClick={(_, newPos) => {
          seek(newPos);
          getPosition();
        }}
      />
    </div>
  );
};

PlayerSlider.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  dispatchSliding: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.player.status,
  position: state.player.position,
  duration: state.player.metadata.duration
});

const mapDispatchToProps = {
  dispatchSliding: setSliding
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSlider);
