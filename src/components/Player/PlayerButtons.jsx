import React, { Fragment, memo } from 'react';
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
import { setIndex, shufflePlaylist, setIndexNext, setIndexPrevious } from '../../actions/playlistActions';

// Utils
import { cleanUrl } from '../../utils';

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
    setPlaylistIndex,
    shuffle,
    setSystemVolume,
    setPlaylistIndexNext,
    setPlaylistIndexPrevious
  } = props;

  const handleShuffle = () => {
    setSongPosition(0);
    shuffle();
    setPlaylistIndex(0);
  };

  const handleScroll = delta => {
    const newVolume = volume - (delta / 10);

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
            onClick={() => setPlaylistIndexPrevious()}
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
            onClick={() => setPlaylistIndexNext()}
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
        // url={cleanUrl(url)}
        url="https://r1---sn-5hne6nsr.googlevideo.com/videoplayback?id=o-ACPSICtwLVcLq3Kz65UtRkxzQBx0QhnK6Hns6SEBrwrr&itag=18&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-5hne6nsr%2Csn-5hnedn7s&ms=au%2Crdu&mv=m&pl=22&ei=EsrIXP-QCZf81wLujIuYAw&initcwndbps=945000&mime=video%2Fmp4&gir=yes&clen=61199759&ratebypass=yes&dur=2182.327&lmt=1540729765041462&mt=1556662718&fvip=4&c=WEB&txp=5531432&ip=37.0.94.188&ipbits=0&expire=1556684402&sparams=ip%2Cipbits%2Cexpire%2Cid%2Citag%2Csource%2Crequiressl%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cei%2Cinitcwndbps%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&key=yt8&signature=A40DDBB5B1EAFCD0617C8169789D7270E9BDF12E.1B2383F9CFC220E46BA57CD6D49DE89CDC79AB6F"
        volume={volume}
        playStatus={status}
        position={songPosition}
        onPlaying={({ position }) => setSongPosition(position)}
        onFinishedPlaying={() => setPlaylistIndexNext()}
      />
    </Fragment>
  );
};

PlayerButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  setPlaylistIndexNext: PropTypes.func,
  setPlaylistIndexPrevious: PropTypes.func,
  url: PropTypes.string,
  volume: PropTypes.number,
  status: PropTypes.string,
  songPosition: PropTypes.number,
  setSongStatus: PropTypes.func,
  setSongPosition: PropTypes.func,
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
  setPlaylistIndexNext: () => dispatch(setIndexNext()),
  setPlaylistIndexPrevious: () => dispatch(setIndexPrevious()),
  setSongStatus: status => dispatch(setStatus(status)),
  setSystemVolume: volume => dispatch(setVolume(volume)),
  setSongPosition: position => dispatch(setPosition(position)),
  setPlaylistIndex: index => dispatch(setIndex(index)),
  shuffle: () => dispatch(shufflePlaylist())
});

export default memo(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerButtonsStyle)(PlayerButtons)));
