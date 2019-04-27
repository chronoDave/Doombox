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
import MuteIcon from '@material-ui/icons/VolumeOff';
import VolumeLowIcon from '@material-ui/icons/VolumeMute';
import VolumeMediumIcon from '@material-ui/icons/VolumeDown';
import VolumeHighIcon from '@material-ui/icons/VolumeUp';

// Experimental
import Slider from '@material-ui/lab/Slider';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

import Typography from '../Typography/Typography';
import Divider from '../Divider/Divider';

// Actions
import { setStatus, setPosition, setVolume } from '../../actions/songActions';
import { setIndex, shufflePlaylist } from '../../actions/playlistActions';

// Utils
import { cleanUrl } from '../../functions';

// Style
import PlayerButtonsStyle from './PlayerButtonsStyle';
import { GridContainer, GridItem } from '../Grid';

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
    shuffle,
    setSystemVolume
  } = props;

  const handleNext = () => {
    setPlaylistIndex(playlistIndex === playlistSize - 1 ? 0 : playlistIndex + 1);
    setSongPosition(0);
    setSongStatus('PLAYING');
  };

  const handlePrevious = () => {
    setPlaylistIndex(playlistIndex === 0 ? playlistSize - 1 : playlistIndex - 1);
    setSongPosition(0);
    setSongStatus('PLAYING');
  };

  const handleShuffle = () => {
    setSongPosition(0);
    shuffle();
    setPlaylistIndex(0);
  };

  const handleScroll = delta => {
    const newVolume = volume + (delta / 10);

    if (newVolume <= 100 && newVolume >= 0) setSystemVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <MuteIcon fontSize="small" classes={{ root: classes.icon }} />;
    if (volume <= 33) return <VolumeLowIcon fontSize="small" classes={{ root: classes.icon }} />;
    if (volume <= 66) return <VolumeMediumIcon fontSize="small" classes={{ root: classes.icon }} />;
    return <VolumeHighIcon fontSize="small" classes={{ root: classes.icon }} />;
  };

  return (
    <Fragment>
      <GridContainer
        direction="column"
        alignItems="center"
      >
        <GridContainer
          wrap="nowrap"
          justify="space-around"
          classes={{ root: classes.container }}
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
            onClick={() => handleShuffle()}
          >
            <ShuffleIcon color="inherit" />
          </IconButton>
        </GridContainer>
        <Divider light classes={{ root: classes.divider }} />
        <GridContainer
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
          classes={{ root: classes.container }}
        >
          <GridItem xs={3}>
            <IconButton
              onClick={() => setSystemVolume(0)}
              onWheel={event => handleScroll(event.deltaY)}
            >
              {getVolumeIcon()}
            </IconButton>
          </GridItem>
          <GridItem xs={1}>
            <Typography variant="caption">
              {Math.floor(volume)}
            </Typography>
          </GridItem>
          <GridItem xs={8} classes={{ root: classes.slider }}>
            <Slider
              value={volume}
              onChange={(event, value) => setSystemVolume(value)}
              classes={{
                track: classes.track,
                thumb: classes.thumb
              }}
            />
          </GridItem>
        </GridContainer>
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
  shuffle: PropTypes.func,
  setSystemVolume: PropTypes.func
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
  setSystemVolume: volume => dispatch(setVolume(volume)),
  setSongPosition: position => dispatch(setPosition(position)),
  setPlaylistIndex: index => dispatch(setIndex(index)),
  shuffle: () => dispatch(shufflePlaylist())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerButtonsStyle)(PlayerButtons));
