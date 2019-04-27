import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GridContainer, GridItem } from '../Grid';
import {
  AlbumView,
  PlaylistView,
  LabelView,
  SongView,
  SearchView
} from '../../views';
import { MainDrawer, AlbumDrawer } from '../Drawer';

// Actions
import { fetchAll } from '../../actions/fetchActions';
import { deleteDatabase, setDatabaseCreated } from '../../actions/databaseActions';
import { setPlaylist } from '../../actions/playlistActions';
import { setSong, setStatus, setPosition } from '../../actions/songActions';

// Types
import {
  VIEW_PLAYLIST,
  VIEW_LABEL,
  VIEW_ALBUM,
  VIEW_SONG,
  VIEW_SEARCH
} from '../../actionTypes/windowTypes';

// Img
import MainBackgroundImage from '../../assets/images/bg.jpg';

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
      isDatabaseUpdated,
      playlistIndex,
    } = this.props;

    /*
      Fetch collection from database on:
        - View change
        - Database update
    */
    if (
      (
        prevProps.view !== view
        && view !== VIEW_SEARCH
      )
      || (
        prevProps.isDatabaseUpdated !== isDatabaseUpdated
        && isDatabaseUpdated
      )
    ) getAll(view);

    // Generate playlist on startup
    if (
      playlist.length === 0
      && (
        labelList.length !== 0
        || albumList.length !== 0
        || songList.length !== 0
      )
    ) {
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

      // Only set active song if collection isn't empty
      if (collection.length !== 0) {
        setCurrentSong(collection[0]);
      }
    }

    // Set playlist on next/previous song or shuffle
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

  handleDelete() {
    const { deleteDb, setCurrentPlaylist, toggleDatabaseCreated } = this.props;

    deleteDb();
    setCurrentPlaylist([]);
    toggleDatabaseCreated();
  }

  renderView() {
    const {
      view,
      labelList,
      albumList,
      songList,
      playlist,
      menuId,
      albumIndex
    } = this.props;

    switch (view) {
      case VIEW_PLAYLIST: return playlist.length !== 0 ? <PlaylistView /> : <CircularProgress />;
      case VIEW_LABEL: return labelList.length !== 0 ? (
        <Fragment>
          <LabelView />
          <AlbumDrawer album={_.chain(labelList[menuId])
            .groupBy(label => label.album)
            .toPairs()
            .map(array => array[1])
            .sortBy(array => array[0].year)
            .value()[albumIndex]} />
        </Fragment>
      ) : <CircularProgress />;
      case VIEW_ALBUM: return albumList.length !== 0 ? (
        <Fragment>
          <AlbumView />
          <AlbumDrawer album={this.getActiveCollection()[menuId]} />
        </Fragment>
      ) : <CircularProgress />;
      case VIEW_SONG: return songList.length !== 0 ? <SongView /> : <CircularProgress />;
      case VIEW_SEARCH: return <SearchView />;
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
    } = this.props;

    return (
      <div
        className={classes.root}
        style={{
          backgroundImage: `url(${MainBackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
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
          onDelete={() => this.handleDelete()}
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
  albumIndex: PropTypes.number,
  isDatabaseUpdated: PropTypes.bool,
  toggleDatabaseCreated: PropTypes.func,
  playlistIndex: PropTypes.number,
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
  menuId: state.window.id,
  albumIndex: state.window.albumIndex,
  isDatabaseUpdated: state.system.databaseUpdated
});

const mapDispatchToProps = dispatch => ({
  setSongStatus: status => dispatch(setStatus(status)),
  setSongPosition: position => dispatch(setPosition(position)),
  getAll: view => dispatch(fetchAll(view)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  setCurrentSong: song => dispatch(setSong(song)),
  deleteDb: () => dispatch(deleteDatabase()),
  toggleDatabaseCreated: () => dispatch(setDatabaseCreated(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
