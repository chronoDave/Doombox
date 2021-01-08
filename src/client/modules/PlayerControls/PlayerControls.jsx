import React from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import { STATUS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { ButtonIcon, ButtonVolume } from '../../components';

// Hooks
import { useAudio, useMediaQuery } from '../../hooks';

// Styles
import usePlayerControls from './PlayerControls.styles';

const PlayerControls = ({ status, className }) => {
  const {
    play,
    pause,
    next,
    previous,
    shuffle
  } = useAudio();
  const isNotSmall = useMediaQuery(({ create, join }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'xs')
  ));
  const classes = usePlayerControls();

  return (
    <div className={cx(classes.root, className)}>
      <ButtonVolume small={!isNotSmall} className={classes.button} />
      <ButtonIcon
        icon="previous"
        small={!isNotSmall}
        onClick={previous}
        className={classes.button}
      />
      <ButtonIcon
        icon={status === STATUS.AUDIO.PLAYING ? 'pause' : 'play'}
        small={!isNotSmall}
        onClick={status === STATUS.AUDIO.PLAYING ? pause : play}
        className={classes.button}
      />
      <ButtonIcon
        icon="next"
        small={!isNotSmall}
        onClick={next}
        className={classes.button}
      />
      <ButtonIcon
        icon="shuffle"
        small={!isNotSmall}
        onClick={shuffle}
        className={classes.button}
      />
    </div>
  );
};

PlayerControls.defaultProps = {
  className: null
};

PlayerControls.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

const mapStateToProps = state => ({
  volume: state.player.volume,
  status: state.player.status
});

export default connect(
  mapStateToProps
)(PlayerControls);
