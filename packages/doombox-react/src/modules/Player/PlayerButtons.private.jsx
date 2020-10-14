import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import IconNext from '@material-ui/icons/SkipNext';
import IconPrevious from '@material-ui/icons/SkipPrevious';
import IconShuffle from '@material-ui/icons/Shuffle';
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Hooks
import { useAudio } from '../../hooks';

import { IconButton } from '../../components';

// Types
import { STATUS } from '../../../../doombox-types';

// Styles
import { usePlayerStyles } from './Player.style';

const PlayerButtons = ({ status }) => {
  const {
    play,
    pause,
    next,
    previous,
    shuffle
  } = useAudio();
  const classes = usePlayerStyles();

  return (
    <div className={classes.buttonsRoot}>
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={previous}
      >
        <IconPrevious classes={{ root: classes.iconButtonIcon }} />
      </IconButton>
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={() => (status === STATUS.AUDIO.PLAYING ? pause() : play())}
      >
        {status === STATUS.AUDIO.PLAYING ? (
          <IconPause classes={{ root: classes.iconButtonIcon }} />
        ) : (
          <IconPlay classes={{ root: classes.iconButtonIcon }} />
        )}
      </IconButton>
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={next}
      >
        <IconNext classes={{ root: classes.iconButtonIcon }} />
      </IconButton>
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={shuffle}
      >
        <IconShuffle classes={{ root: classes.iconButtonIcon }} />
      </IconButton>
    </div>
  );
};

PlayerButtons.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

const mapStateToProps = state => ({
  status: state.player.status
});

export default connect(
  mapStateToProps
)(PlayerButtons);
