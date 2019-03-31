import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

// Icons
import PreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

// Actions
import { setStatus, setPosition } from '../../actions/songActions';
import { setIndex, shufflePlaylist } from '../../actions/playlistActions';

// Utils
import { cleanUrl } from '../../functions';

// Style
import PlayerButtonsStyle from './PlayerButtonsStyle';
import { GridContainer } from '../Grid';

const PlayerButtons = props => {
  const {
    classes,
    url,
    volume,
    status,
    songPosition,
    setSongStatus,
    setSongPosition,
    playlistIndex,
    playlistSize,
    setPlaylistIndex,
    shuffle
  } = props;

  const handleNext = () => setPlaylistIndex(playlistIndex === playlistSize - 1 ? 0 : playlistIndex + 1);
  const handlePrevious = () => setPlaylistIndex(playlistIndex === 0 ? playlistSize - 1 : playlistIndex - 1);

  return (
    <Fragment>
      <GridContainer
        wrap="nowrap"
        justify="space-around"
      >
        <IconButton
          classes={{ root: classes.root }}
          onClick={() => handlePrevious()}
        >
          <PreviousIcon color="inherit" />
        </IconButton>
        <IconButton
          classes={{ root: classes.root }}
          onClick={() => setSongStatus(status === 'PLAYING' ? 'PAUSED' : 'PLAYING')}
        >
          {status === 'PLAYING'
            ? <PauseIcon color="inherit" />
            : <PlayIcon color="inherit" />
          }
        </IconButton>
        <IconButton
          classes={{ root: classes.root }}
          onClick={() => handleNext()}
        >
          <NextIcon color="inherit" />
        </IconButton>
        <IconButton
          classes={{ root: classes.root }}
          onClick={() => shuffle()}
        >
          <ShuffleIcon color="inherit" />
        </IconButton>
      </GridContainer>
      <Sound
        url={cleanUrl(url)}
        volume={volume}
        playStatus={status}
        position={songPosition}
        onPlaying={({ position }) => setSongPosition(position)}
        onFinishedPlaying={() => handleNext()}
      />
    </Fragment>
  );
};

PlayerButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  volume: PropTypes.number,
  status: PropTypes.string,
  songPosition: PropTypes.number,
  setSongStatus: PropTypes.func,
  setSongPosition: PropTypes.func,
  playlistIndex: PropTypes.number,
  playlistSize: PropTypes.number,
  setPlaylistIndex: PropTypes.func,
  shuffle: PropTypes.func
};

const mapStateToProps = state => ({
  url: state.song.url,
  volume: state.song.volume,
  status: state.song.playStatus,
  songPosition: state.song.position,
  playlistIndex: state.playlist.index,
  playlistSize: state.playlist.size
});

const mapDispatchToProps = dispatch => ({
  setSongStatus: status => dispatch(setStatus(status)),
  setSongPosition: position => dispatch(setPosition(position)),
  setPlaylistIndex: index => dispatch(setIndex(index)),
  shuffle: () => dispatch(shufflePlaylist())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerButtonsStyle)(PlayerButtons));
