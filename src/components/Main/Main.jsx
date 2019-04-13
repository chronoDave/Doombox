import React, { Component } from 'react';
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
  fetchAll
} from '../../actions/fetchActions';
import {
  deleteDatabase
} from '../../actions/databaseActions';
import { setPlaylist } from '../../actions/playlistActions';
import { setPosition, setSong } from '../../actions/songActions';

// Types
import { VIEW_PLAYLIST, VIEW_LABEL, VIEW_ALBUM, VIEW_SONG } from '../../actionTypes/windowTypes';

// Style
import MainStyle from './MainStyle';

class Main extends Component {
  componentDidMount() {
    const {
      view,
      getAll
    } = this.props;

    getAll(view);
  }

  componentDidUpdate(prevProps) {
    const {
      albumList,
      setCurrentPlaylist,
      setSongPosition,
      playlistIndex,
      playlist,
      setCurrentSong
    } = this.props;

    if (prevProps.albumList !== albumList) {
      const collection = Object.values(albumList)
        .reduce((acc, val) => acc.concat(val), []);
      setCurrentPlaylist(collection);
    }

    if (prevProps.playlist !== playlist || prevProps.playlistIndex !== playlistIndex) {
      if (playlist.length !== 0) {
        setCurrentSong(playlist[playlistIndex]);
        setSongPosition(0);
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
  getAll: view => dispatch(fetchAll(view)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  setCurrentSong: song => dispatch(setSong(song)),
  setSongPosition: position => dispatch(setPosition(position)),
  deleteDb: () => dispatch(deleteDatabase())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
