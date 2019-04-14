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
import { fetchAll } from '../../actions/fetchActions';
import { deleteDatabase } from '../../actions/databaseActions';
import { setPlaylist } from '../../actions/playlistActions';
import { setSong } from '../../actions/songActions';

// Types
import {
  VIEW_PLAYLIST,
  VIEW_LABEL,
  VIEW_ALBUM,
  VIEW_SONG
} from '../../actionTypes/windowTypes';

// Style
import MainStyle from './MainStyle';

class Main extends Component {
  componentDidMount() {
    const { view, getAll } = this.props;

    getAll(view);
  }

  componentDidUpdate(prevProps) {
    const {
      view,
      getAll,
      playlist,
      labelList,
      albumList,
      songList,
      setCurrentPlaylist,
      setCurrentSong,
      playlistIndex
    } = this.props;

    // Fetch data on view change
    if (prevProps.view !== view) getAll(view);

    // Generate playlist on startup.
    if (playlist.length === 0) {
      let collection;

      switch (view) {
        case VIEW_LABEL:
          collection = labelList.reduce((acc, val) => acc.concat(val), []);
          break;
        case VIEW_ALBUM:
          collection = albumList.reduce((acc, val) => acc.concat(val), []);
          break;
        case VIEW_SONG:
          collection = songList;
          break;
        default:
          break;
      }

      setCurrentPlaylist(collection);
      setCurrentSong(collection[0]);
    }

    /*
      Update playlist on index change (prev / next song)
      or playlist change (added / deleted song from playlist)
    */
    if (
      prevProps.playlistIndex !== playlistIndex
      || prevProps.playlist !== playlist
    ) {
      setCurrentSong(playlist[playlistIndex]);
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
      playlist,
      menuId
    } = this.props;

    switch (view) {
      case VIEW_PLAYLIST: return playlist.length !== 0 ? <PlaylistView /> : <CircularProgress />;
      case VIEW_LABEL: return labelList.length !== 0 ? <LabelView /> : <CircularProgress />;
      case VIEW_ALBUM: return albumList.length !== 0 ? (
        <Fragment>
          <AlbumView />
          <AlbumDrawer album={this.getActiveCollection()[menuId]} />
        </Fragment>
      ) : <CircularProgress />;
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
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  songList: PropTypes.array.isRequired,
  albumList: PropTypes.array.isRequired,
  labelList: PropTypes.array.isRequired,
  setCurrentPlaylist: PropTypes.func,
  setCurrentSong: PropTypes.func,
  view: PropTypes.string,
  getAll: PropTypes.func.isRequired,
  playlistSize: PropTypes.number,
  labelSize: PropTypes.number,
  albumSize: PropTypes.number,
  songSize: PropTypes.number,
  isBusy: PropTypes.bool,
  playlist: PropTypes.array,
  deleteDb: PropTypes.func,
  menuId: PropTypes.number,
  playlistIndex: PropTypes.number
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  songList: state.list.songList,
  labelList: state.list.labelList,
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
  getAll: view => dispatch(fetchAll(view)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  setCurrentSong: song => dispatch(setSong(song)),
  deleteDb: () => dispatch(deleteDatabase())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
