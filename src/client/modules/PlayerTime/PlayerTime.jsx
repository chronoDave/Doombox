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
  const [current, create, destroy] = useTimer(position);
  const { formatTime } = useTranslation();
  const classes = usePlayerTimeStyles();

  useEffect(() => {
    if (status === STATUS.AUDIO.PLAYING && !sliding) {
      create();
    } else {
      destroy();
    }
  }, [sliding, status, create, destroy]);

  return (
    <div className={classes.root}>
      <Typography color="inherit">
        {formatTime(current)}
      </Typography>
      <Typography color="inherit">
        {`-${formatTime(duration - current)}`}
      </Typography>
    </div>
  );
};

const mapStateToProps = state => ({
  status: state.player.status,
  position: state.player.position,
  duration: state.player.duration,
  sliding: state.player.sliding
});

PlayerTime.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired,
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  sliding: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps
)(PlayerTime);
