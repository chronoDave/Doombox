import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import PlayerControls from '../PlayerControls/PlayerControls';
import { GridContainer, GridItem } from '../Grid';
import { AlbumView, StartView } from '../../views';
import SideMenu from '../SideMenu/SideMenu';
import Optionbar from '../Optionbar/Optionbar';

// Actions
import { fetchAlbumList, fetchSongs } from '../../actions/databaseActions';
import { closeWindow, toggleWindow } from '../../actions/windowActions';
import { setPlaylist } from '../../actions/playlistActions';

// Style
import MainStyle from './MainStyle';

class Main extends Component {
  componentDidMount() {
    const { getAlbumList } = this.props;

    getAlbumList();
  }

  componentDidUpdate(prevProps) {
    const { albumList, setCurrentPlaylist } = this.props;

    if (prevProps.albumList !== albumList) {
      const collection = Object.values(albumList).map(album => album.songs).reduce((acc, val) => acc.concat(val), []);
      setCurrentPlaylist(collection);
    }
  }

  submit = values => {
    const { setMusicFolder } = this.props;
    setMusicFolder(values);
  }

  handleClick = (index, id) => {
    const { getSongs, toggleMenu } = this.props;

    getSongs(id);
    toggleMenu(index, id);
  };

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
          </GridItem>
        </GridContainer>
        <Optionbar />
        {playlist.length !== 0 && (
          <PlayerControls
            playlist={playlist}
            onClick={() => this.handleClick(selected, albumList[selected]._id)}
          />
        )}
        {(albumList && albumList.length !== 0) && (
          <SideMenu
            onClose={() => closeSongMenu()}
            songs={songList}
            open={menuVisible}
            cover={albumList[selected].cover}
            label={albumList[selected].label}
          />
        )}
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  menuVisible: PropTypes.bool,
  songList: PropTypes.array,
  albumList: PropTypes.array,
  getAlbumList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  songList: state.list.songList,
  menuVisible: state.window.menuVisible,
  selected: state.window.selected,
  playlist: state.playlist.collection
});

const mapDispatchToProps = dispatch => ({
  getAlbumList: () => dispatch(fetchAlbumList()),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  closeSongMenu: () => dispatch(closeWindow()),
  getSongs: id => dispatch(fetchSongs(id)),
  toggleMenu: (id, index) => dispatch(toggleWindow(id, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(MainStyle)(Main));
