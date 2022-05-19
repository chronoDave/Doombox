import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Slider } from '../../../../components';

// Hooks
import { useAudio } from '../../../../hooks';

// Redux
import { setSliding } from '../../../../redux';

import './PlayerSlider.scss';

const PlayerSlider = ({ current, duration, dispatchSliding }) => {
  const { seek, getPosition } = useAudio();

  return (
    <div className="PlayerSlider">
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
  current: PropTypes.number.isRequired,
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
