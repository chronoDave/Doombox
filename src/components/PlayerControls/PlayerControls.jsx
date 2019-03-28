import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ImgCover from '../ImgCover/ImgCover';
import { GridContainer, GridItem } from '../Grid';
import PlayerSlider from '../PlayerSlider/PlayerSlider';
import PlayerButtons from '../PlayerButtons/PlayerButtons';

// Actions
import {
  setPosition,
  setVolume,
  setStatus,
} from '../../actions/songActions';
import { fetchSong } from '../../actions/databaseActions';
import { setPlaylistIndex, popPlaylist } from '../../actions/playlistActions';
import { setActiveWindow } from '../../actions/windowActions';

// Utils
import { getDurationFormat } from '../../functions';

// Style
import PlayerControlsStyle from './PlayerControlsStyle';

class PlayerControls extends Component {
  componentDidMount() {
    const {
      getSong,
      playlistIndex,
      playlist
    } = this.props;

    getSong(playlist[playlistIndex]);
  }

  componentDidUpdate(prevProps) {
    const {
      playlist,
      playlistIndex,
      getSong,
      setCurrentPosition,
      setCurrentIndex,
      customPlaylist,
      setCurrentAlbum,
      isCustom
    } = this.props;

    if (prevProps.isCustom !== isCustom) {
      setCurrentIndex(0);
      if (isCustom === false) {
        getSong(playlist[playlistIndex]);
      }
    }
    if ((prevProps.customPlaylist !== customPlaylist) && isCustom) {
      setCurrentPosition(0);
      getSong(customPlaylist[playlistIndex < customPlaylist.length - 1 ? playlistIndex : 0]);
    }
    if (prevProps.playlist !== playlist) {
      setCurrentPosition(0);
      setCurrentIndex(0);
      getSong(playlist[playlistIndex]);
    }
    if (prevProps.playlistIndex !== playlistIndex) {
      setCurrentPosition(0);
      if (isCustom) {
        setCurrentAlbum(customPlaylist[playlistIndex]);
        getSong(customPlaylist[playlistIndex]);
      } else {
        setCurrentAlbum(playlist[playlistIndex]);
        getSong(playlist[playlistIndex]);
      }
    }
  }

  getCurrent = () => {
    const { songPosition } = this.props;
    const currentPosition = songPosition / 1000;

    return currentPosition;
  }

  getPercentage = () => {
    const { duration } = this.props;
    const percentage = this.getCurrent() / duration * 100;

    return percentage;
  }

  handleNext = () => {
    const {
      playlistIndex,
      playlist,
      setCurrentIndex,
      popCurrentPlaylist,
      isCustom
    } = this.props;

    if (isCustom) return popCurrentPlaylist();
    if (playlistIndex < playlist.length - 1) return setCurrentIndex(playlistIndex + 1);
    return setCurrentIndex(0);
  };

  handlePrevious = () => {
    const {
      playlistIndex,
      playlist,
      setCurrentIndex,
      customPlaylist,
      isCustom,
    } = this.props;

    if (playlistIndex > 0) return setCurrentIndex(playlistIndex - 1);
    return setCurrentIndex(isCustom ? customPlaylist.length - 1 : playlist.length - 1);
  };

  handlePlay = () => {
    const { setCurrentStatus, status } = this.props;

    if (status === 'PLAYING') return setCurrentStatus('PAUSED');
    return setCurrentStatus('PLAYING');
  };

  cleanUrl = url => {
    const splitUrl = url.replace(/#/g, '%23').split('.');

    if (splitUrl.length === 2) return url;
    return splitUrl.map((item, index) => {
      if (index < splitUrl.length - 2) return `${item}%2E`;
      if (index < splitUrl.length - 1) return `${item}.`;
      return item;
    }).join('');
  }

  render() {
    const {
      url,
      cover,
      artist,
      title,
      songPosition,
      status,
      volume,
      setCurrentPosition,
      setCurrentVolume,
      classes,
      duration,
      onClick
    } = this.props;

    return (
      <Fragment>
        <GridContainer
          classes={{ root: classes.root }}
          alignItems="center"
        >
          <ButtonBase onClick={onClick}>
            <ImgCover cover={cover && this.cleanUrl(cover)} small />
            <GridItem classes={{ root: classes.playerText }}>
              <GridContainer
                direction="column"
                alignItems="flex-start"
              >
                <Typography variant="caption">
                  {title}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {artist}
                </Typography>
              </GridContainer>
            </GridItem>
          </ButtonBase>
          <GridItem xs classes={{ root: classes.playerSlider }}>
            <PlayerSlider
              position={this.getPercentage()}
              onDrag={(event, value) => setCurrentPosition(duration * value * 10)}
              remaining={getDurationFormat(duration - this.getCurrent())}
              elapsed={getDurationFormat(songPosition / 1000)}
              duration={duration}
            />
          </GridItem>
          <GridItem>
            <PlayerButtons
              volume={volume}
              playing={status !== 'PLAYING'}
              onVolumeChange={(event, value) => setCurrentVolume(Math.floor(value))}
              onNext={() => this.handleNext()}
              onPrevious={() => this.handlePrevious()}
              onPlay={() => this.handlePlay()}
            />
          </GridItem>
        </GridContainer>
        {url && (
          <Sound
            url={this.cleanUrl(url)}
            volume={volume}
            playStatus={status}
            position={songPosition}
            onPlaying={({ position }) => setCurrentPosition(position)}
            onFinishedPlaying={() => this.handleNext()}
          />
        )}
      </Fragment>
    );
  }
}

PlayerControls.propTypes = {
  onClick: PropTypes.func,
  getSong: PropTypes.func,
  setCurrentPosition: PropTypes.func,
  setCurrentVolume: PropTypes.func,
  setCurrentStatus: PropTypes.func,
  setCurrentIndex: PropTypes.func,
  popCurrentPlaylist: PropTypes.func,
  setCurrentAlbum: PropTypes.func,
  playlistIndex: PropTypes.number,
  playlist: PropTypes.array,
  customPlaylist: PropTypes.array,
  isCustom: PropTypes.bool,
  songPosition: PropTypes.number,
  duration: PropTypes.number,
  status: PropTypes.string,
  url: PropTypes.string,
  cover: PropTypes.string,
  artist: PropTypes.string,
  title: PropTypes.string,
  volume: PropTypes.number,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cover: state.song.cover,
  songPosition: state.song.position,
  url: state.song.url,
  artist: state.song.artist,
  title: state.song.title,
  duration: state.song.duration,
  status: state.song.playStatus,
  volume: state.song.volume,
  playlist: state.playlist.collection,
  customPlaylist: state.playlist.customCollection,
  playlistIndex: state.playlist.index,
  isCustom: state.playlist.isCustom
});

const mapDispatchToProps = dispatch => ({
  setCurrentPosition: position => dispatch(setPosition(position)),
  setCurrentVolume: volume => dispatch(setVolume(volume)),
  setCurrentStatus: status => dispatch(setStatus(status)),
  setCurrentIndex: index => dispatch(setPlaylistIndex(index)),
  popCurrentPlaylist: () => dispatch(popPlaylist()),
  setCurrentAlbum: id => dispatch(setActiveWindow(id)),
  getSong: id => dispatch(fetchSong(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlayerControlsStyle)(PlayerControls));
