import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { STATUS } from '../../../../../types';
import { cx } from '../../../../utils';
import { ButtonIcon, ButtonVolume } from '../../../../components';
import { useAudio, useMediaQuery } from '../../../../hooks';

import './PlayerControls.scss';

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

  return (
    <div className={cx('PlayerControls', className)}>
      <ButtonVolume small={!isNotSmall} />
      <ButtonIcon
        icon="previous"
        small={!isNotSmall}
        onClick={previous}
      />
      <ButtonIcon
        icon={status === STATUS.AUDIO.PLAYING ? 'pause' : 'play'}
        small={!isNotSmall}
        onClick={status === STATUS.AUDIO.PLAYING ? pause : play}
      />
      <ButtonIcon
        icon="next"
        small={!isNotSmall}
        onClick={next}
      />
      <ButtonIcon
        icon="shuffle"
        small={!isNotSmall}
        onClick={shuffle}
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
