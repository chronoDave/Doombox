import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GridContainer, GridItem } from '../Grid';
import { AlbumView, StartView, PlaylistView } from '../../views';
import { MainDrawer, AlbumDrawer } from '../Drawer';

// Actions
import { fetchAlbumList, fetchSongs, fetchSong } from '../../actions/databaseActions';
import { closeWindow, toggleWindow } from '../../actions/windowActions';
import { setPlaylist } from '../../actions/playlistActions';
import { setPosition } from '../../actions/songActions';

// Style
import MainStyle from './MainStyle';

class Main extends Component {
  componentDidMount() {
    const { getAlbumList } = this.props;

    getAlbumList();
  }

  componentDidUpdate(prevProps) {
    const {
      albumList,
      setCurrentPlaylist,
      setSongPosition,
      getSong,
      playlistIndex,
      playlist
    } = this.props;

    if (prevProps.albumList !== albumList) {
      const collection = Object.values(albumList).map(album => album.songs).reduce((acc, val) => acc.concat(val), []);
      setCurrentPlaylist(collection);
    }

    if (prevProps.playlist !== playlist || prevProps.playlistIndex !== playlistIndex) {
      setSongPosition(0);
      getSong(playlist[playlistIndex]);
    }
  }

  render() {
    const {
      classes,
      menuVisible,
      songList,
      albumList,
      closeSongMenu,
      selected,
      playlist
    } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer
          direction="column"
          fullHeight
          wrap="nowrap"
          classes={{ root: classes.gridContainerRoot }}
        >
          <GridItem xs>
            {/* {(albumList && albumList.length === 0) && <StartView onSubmit={this.submit} />} */}
            {albumList ? <AlbumView /> : <CircularProgress />}
            {/* <PlaylistView /> */}
          </GridItem>
        </GridContainer>
        <MainDrawer />
        {/* {(albumList && albumList.length !== 0) && (
          <AlbumDrawer
            onClose={() => closeSongMenu()}
            songs={songList}
            open={menuVisible}
            cover={albumList[selected].cover}
            label={albumList[selected].label}
          />
        )} */}
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  menuVisible: PropTypes.bool,
  songList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  albumList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  getAlbumList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  songList: state.list.songList,
  menuVisible: state.window.menuVisible,
  selected: state.window.selected,
  playlist: state.playlist.collection,
  playlistIndex: state.playlist.index
});

const mapDispatchToProps = dispatch => ({
  getAlbumList: () => dispatch(fetchAlbumList()),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  closeSongMenu: () => dispatch(closeWindow()),
  getSongs: id => dispatch(fetchSongs(id)),
  getSong: id => dispatch(fetchSong(id)),
  setSongPosition: position => dispatch(setPosition(position)),
  toggleMenu: (id, index) => dispatch(toggleWindow(id, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
