import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GridContainer, GridItem } from '../Grid';
import {
  AlbumView,
  PlaylistView,
  LabelView,
  SongView
} from '../../views';
import { MainDrawer, AlbumDrawer } from '../Drawer';
import { MainBackground } from '../Background';

// Actions
import {
  fetchLabelList,
  fetchAlbumList,
  fetchSongList,
  fetchSongs,
  fetchSong,
  fetchLabelSize,
  fetchAlbumSize,
  fetchSongSize,
  deleteDatabase
} from '../../actions/databaseActions';
import { setPlaylist } from '../../actions/playlistActions';
import { setPosition } from '../../actions/songActions';

// Types
import { VIEW_PLAYLIST, VIEW_LABEL, VIEW_ALBUM, VIEW_SONG } from '../../actionTypes/windowTypes';

// Style
import MainStyle from './MainStyle';

class Main extends Component {
  componentDidMount() {
    const {
      view,
      getLabelList,
      getAlbumList,
      getSongList,
      getLabelSize,
      getAlbumSize,
      getSongSize
    } = this.props;

    getLabelSize();
    getAlbumSize();
    getSongSize();

    switch (view) {
      case VIEW_PLAYLIST: {
        return getAlbumList();
      }
      case VIEW_LABEL: {
        return getLabelList();
      }
      case VIEW_ALBUM: {
        return getAlbumList();
      }
      case VIEW_SONG: {
        return getSongList();
      }
      default: return null;
    }
  }

  componentDidUpdate(prevProps) {
    const {
      albumList,
      setCurrentPlaylist,
      setSongPosition,
      getSong,
      playlistIndex,
      playlist,
      customPlaylist
    } = this.props;

    if (prevProps.albumList !== albumList) {
      const collection = Object.values(albumList).map(album => album.songs).reduce((acc, val) => acc.concat(val), []);
      setCurrentPlaylist(collection);
    }

    if (prevProps.playlist !== playlist || prevProps.playlistIndex !== playlistIndex) {
      if (playlist.length !== 0) {
        setSongPosition(0);
        getSong(playlist[playlistIndex]);
      }
    }
  }

  getActiveCollection() {
    const {
      view,
      labelList,
      albumList,
      songList,
      playlist
    } = this.props;

    switch (view) {
      case VIEW_PLAYLIST: return playlist;
      case VIEW_LABEL: return labelList;
      case VIEW_ALBUM: return albumList;
      case VIEW_SONG: return songList;
      default: return null;
    }
  }

  renderView() {
    const {
      view,
      labelList,
      albumList,
      songList,
      playlist
    } = this.props;

    switch (view) {
      case VIEW_PLAYLIST: return playlist.length !== 0 ? <PlaylistView /> : <CircularProgress />;
      case VIEW_LABEL: return labelList.length !== 0 ? <LabelView /> : <CircularProgress />;
      case VIEW_ALBUM: return albumList.length !== 0 ? <AlbumView /> : <CircularProgress />;
      case VIEW_SONG: return songList.length !== 0 ? <SongView /> : <CircularProgress />;
      default: return null;
    }
  }

  render() {
    const {
      classes,
      view,
      playlistSize,
      labelSize,
      albumSize,
      songSize,
      isBusy,
      playlist,
      deleteDb,
      menuId
    } = this.props;

    return (
      <div className={classes.root}>
        <MainBackground />
        <GridContainer
          direction="column"
          fullHeight
          wrap="nowrap"
          classes={{ root: classes.gridContainerRoot }}
        >
          <GridItem xs>
            {this.renderView()}
          </GridItem>
        </GridContainer>
        <MainDrawer
          active={view}
          playlistSize={playlistSize}
          labelSize={labelSize}
          albumSize={albumSize}
          songSize={songSize}
          isBusy={isBusy}
          isEmpty={playlist.length === 0}
          onDelete={deleteDb}
        />
        <AlbumDrawer album={this.getActiveCollection()[menuId]} />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  songList: PropTypes.array.isRequired,
  albumList: PropTypes.array.isRequired,
  getAlbumList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  songList: state.list.songList,
  menuVisible: state.window.menuVisible,
  selected: state.window.selected,
  playlist: state.playlist.collection,
  customPlaylist: state.playlist.customCollection,
  playlistIndex: state.playlist.index,
  view: state.window.view,
  labelSize: state.list.labelSize,
  albumSize: state.list.albumSize,
  songSize: state.list.songSize,
  playlistSize: state.playlist.size,
  isBusy: state.list.isBusy,
  menuId: state.window.id
});

const mapDispatchToProps = dispatch => ({
  getLabelList: () => dispatch(fetchLabelList()),
  getAlbumList: () => dispatch(fetchAlbumList()),
  getSongList: () => dispatch(fetchSongList()),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  getSongs: id => dispatch(fetchSongs(id)),
  getSong: id => dispatch(fetchSong(id)),
  setSongPosition: position => dispatch(setPosition(position)),
  getLabelSize: () => dispatch(fetchLabelSize()),
  getAlbumSize: () => dispatch(fetchAlbumSize()),
  getSongSize: () => dispatch(fetchSongSize()),
  deleteDb: () => dispatch(deleteDatabase())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
