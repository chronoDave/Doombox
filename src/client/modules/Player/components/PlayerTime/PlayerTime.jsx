import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Hooks
import { useTranslation } from '../../../../hooks';

import './PlayerTime.scss';

const PlayerTime = ({ duration, current }) => {
  const { formatTime } = useTranslation();

  return (
    <div className="PlayerTime">
      <p>{formatTime(current)}</p>
      <p>{`-${formatTime(duration - current)}`}</p>
    </div>
  );
};

PlayerTime.propTypes = {
  duration: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  duration: state.player.metadata.duration
});

export default connect(
  mapStateToProps
)(PlayerTime);
