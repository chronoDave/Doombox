import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import { Slider } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Styles
import usePlayerSliderStyles from './PlayerSlider.styles';

const PlayerSlider = ({ position, duration }) => {
  const { seek } = useAudio();
  const classes = usePlayerSliderStyles();

  const throttledSeek = throttle(seek, 100);

  return (
    <div className={classes.root}>
      <Slider
        value={position}
        max={duration}
        onDrag={(_, newPos) => throttledSeek(newPos)}
        onClick={(_, newPos) => seek(newPos)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
});

PlayerSlider.propTypes = {
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps
)(PlayerSlider);
