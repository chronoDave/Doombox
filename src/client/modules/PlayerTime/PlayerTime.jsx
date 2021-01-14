import React, { useEffect } from 'react';
import { STATUS } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../../components';

// Hooks
import { useTranslation, useTimer } from '../../hooks';

// Styles
import usePlayerTimeStyles from './PlayerTime.styles';

const PlayerTime = props => {
  const {
    position,
    duration,
    sliding,
    status
  } = props;
  const [current, { create, update, destroy }] = useTimer(position);
  const { formatTime } = useTranslation();
  const classes = usePlayerTimeStyles();

  useEffect(() => {
    if (!sliding && status === STATUS.AUDIO.PLAYING) {
      create();
    } else {
      destroy();
    }
  }, [sliding, status, create, destroy]);

  useEffect(() => {
    update(position);
  }, [update, position]);

  return (
    <div className={classes.root}>
      <Typography color="inherit">
        {formatTime(current)}
      </Typography>
      <Typography color="inherit">
        {`-${formatTime(Math.max(0, duration - current))}`}
      </Typography>
    </div>
  );
};

PlayerTime.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  sliding: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  status: state.player.status,
  position: state.player.position,
  duration: state.player.metadata.duration,
  sliding: state.player.sliding
});

export default connect(
  mapStateToProps
)(PlayerTime);
