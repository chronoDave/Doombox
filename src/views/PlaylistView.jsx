import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';

// Core
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { GridContainer, GridItem } from '../components/Grid';
import ViewHeader from '../components/ViewHeader/ViewHeader';
import { SongItem } from '../components/ViewItem';
import Img from '../components/Img/Img';
import Divider from '../components/Divider/Divider';

// Actions
import { setIndex } from '../actions/playlistActions';
import { setStatus, setPosition } from '../actions/songActions';

// Style
import PlaylistViewStyle from './PlaylistViewStyle';

const PlaylistView = props => {
  const {
    classes,
    size,
    playlist,
    songId,
    songCover,
    songTitle,
    songArtist,
    songLabel,
    songYear,
    setPlaylistIndex,
    setStatusPlaying,
    resetSongPosition,
    songAlbum
  } = props;

  const handleClick = index => {
    resetSongPosition(0);
    setPlaylistIndex(index);
    setStatusPlaying();
  };

  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title="Playlist collection"
        type="songs"
      >
        <div>Playerholders</div>
      </ViewHeader>
      <GridContainer fullHeight>
        <div className={classes.playlistItem}>
          <Img cover={songCover} type="playlistItem" />
          <GridContainer
            direction="column"
            classes={{ root: classes.playlistTextContainer }}
          >
            <Typography variant="h4">
              {songTitle}
            </Typography>
            <Typography variant="h6">
              {songArtist}
            </Typography>
          </GridContainer>
          <Divider light />
          <GridContainer
            direction="row"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
            classes={{ root: classes.playlistTextContainer }}
          >
            <GridItem>
              <Typography variant="body1">
                {songAlbum}
              </Typography>
              <Typography variant="body2">
                {songLabel}
              </Typography>
            </GridItem>
            <Typography
              variant="body2"
              classes={{ root: classes.textYear }}
            >
              {songYear}
            </Typography>
          </GridContainer>
        </div>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height - 272}
              itemCount={size}
              itemSize={50}
              width={width - 316}
              className={classNames(
                classes.list,
                classes.scrollbar
              )}
            >
              {({ index, style }) => {
                const {
                  _id,
                  title,
                  artist,
                  album,
                  label,
                  duration
                } = playlist[index];

                return (
                  <SongItem
                    active={_id === songId}
                    onClick={() => handleClick(index)}
                    key={_id}
                    style={style}
                    title={title}
                    artist={artist}
                    album={album}
                    label={label}
                    duration={duration}
                  />
                );
              }}
            </List>
          )}
        </AutoSizer>
      </GridContainer>
    </div>
  );
};

PlaylistView.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.array,
  size: PropTypes.number,
  songId: PropTypes.string,
  songCover: PropTypes.string,
  songTitle: PropTypes.string,
  songArtist: PropTypes.string,
  songAlbum: PropTypes.string,
  songLabel: PropTypes.string,
  songYear: PropTypes.number,
  setPlaylistIndex: PropTypes.func,
  setStatusPlaying: PropTypes.func,
  resetSongPosition: PropTypes.func,
};

const mapStateToProps = state => ({
  size: state.playlist.size,
  playlist: state.playlist.collection,
  songId: state.song._id,
  songCover: state.song.cover,
  songTitle: state.song.title,
  songArtist: state.song.artist,
  songAlbum: state.song.album,
  songLabel: state.song.label,
  songYear: state.song.year
});

const mapDispatchToProps = dispatch => ({
  setPlaylistIndex: index => dispatch(setIndex(index)),
  setStatusPlaying: () => dispatch(setStatus('PLAYING')),
  resetSongPosition: () => dispatch(setPosition(0)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PlaylistViewStyle)(PlaylistView));
