import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import AddPlaylistIcon from '@material-ui/icons/PlaylistAdd';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Img from '../Img/Img';
import { GridContainer, GridItem } from '../Grid';
import Divider from '../Divider/Divider';

// Actions
import { toggleDrawer } from '../../actions/windowActions';
import {
  setStatus,
  setPosition
} from '../../actions/songActions';
import {
  shufflePlaylist,
  pushPlaylist,
  setPlaylist,
  setIndex
} from '../../actions/playlistActions';

// Utils
import { getDurationFormat } from '../../functions';

// Style
import AlbumDrawerStyle from './AlbumDrawerStyle';

const AlbumDrawer = props => {
  const {
    open,
    close,
    songs,
    classes,
    album,
    setPlaying,
    resetPosition,
    setCurrentPlaylist,
    setCurrentIndex,
    addToPlaylist,
    shuffle,
    menuId,
    currentSongId
  } = props;

  const handlePlay = () => {
    setCurrentPlaylist(songs.map(song => song._id));
    resetPosition();
    setPlaying();
  };

  const handleShuffle = () => {
    handlePlay();
    shuffle();
  };

  const handleAddPlaylist = () => {
    addToPlaylist(songs.map(song => song._id));
  };

  const handleClick = index => {
    setCurrentIndex(index);
    handlePlay();
  };

  return (
    <Drawer
      open={open}
      onClose={() => close(menuId)}
      anchor="right"
      classes={{
        paper: classNames(classes.root, classes.scrollbar)
      }}
    >
      {songs[0] ? (
        <List
          subheader={<Img cover={album.cover} />}
          disablePadding
        >
          <ListItem classes={{ root: classes.listItemTitle }}>
            <GridContainer
              wrap="nowrap"
              alignItems="center"
            >
              <ListItemText
                primary={album.name}
                primaryTypographyProps={{
                  variant: 'h4'
                }}
                secondary={album.label}
                secondaryTypographyProps={{
                  variant: 'subtitle1'
                }}
                classes={{
                  secondary: classes.light
                }}
              />
              <ListItemText
                primary={album.year}
                primaryTypographyProps={{
                  variant: 'subtitle2'
                }}
                classes={{ primary: classes.light }}
              />
            </GridContainer>
          </ListItem>
          <ListItem>
            <Divider light />
          </ListItem>
          <ListItem classes={{ root: classes.listItemButtons }}>
            <GridContainer
              wrap="nowrap"
              justify="space-between"
              alignItems="center"
            >
              <GridItem xs>
                <IconButton
                  classes={{ root: classes.icon }}
                  onClick={() => handlePlay()}
                >
                  <PlayIcon color="inherit" />
                </IconButton>
                <IconButton
                  classes={{ root: classes.icon }}
                  onClick={() => handleShuffle()}
                >
                  <ShuffleIcon color="inherit" />
                </IconButton>
                <IconButton
                  classes={{ root: classes.icon }}
                  onClick={() => handleAddPlaylist()}
                >
                  <AddPlaylistIcon color="inherit" />
                </IconButton>
              </GridItem>
              <GridItem>
                <ListItemText
                  primary={getDurationFormat(songs
                    .map(song => song.duration)
                    .reduce((acc, cur) => acc + cur))
                  }
                  primaryTypographyProps={{
                    variant: 'body2'
                  }}
                  classes={{ primary: classes.light }}
                />
              </GridItem>
            </GridContainer>
          </ListItem>
          <ListItem>
            <Divider light />
          </ListItem>
          {songs.map((song, index) => (
            <ListItem
              key={song._id}
              classes={{ container: classes.listItemSong }}
              button
              onClick={() => handleClick(index)}
              className={song._id === currentSongId ? classes.active : undefined}
            >
              <ListItemIcon classes={{ root: classes.listItemSongIcon }}>
                <ListItemText
                  primary={`${index}.`}
                  classes={{ root: classes.listItemSongIcon }}
                />
              </ListItemIcon>
              <ListItemText
                primary={song.title}
                secondary={song.artist}
                secondaryTypographyProps={{
                  variant: 'subtitle2'
                }}
                classes={{
                  secondary: classes.subtitle
                }}
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primary={getDurationFormat(song.duration)}
                  primaryTypographyProps={{ variant: 'caption' }}
                  classes={{ primary: classes.light }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : <CircularProgress />}
    </Drawer>
  );
};

const mapStateToProps = state => ({
  open: state.window.drawer,
  songs: state.list.songList,
  menuId: state.window.id,
  currentSongId: state.song.id
});

const dispatchMapToProps = dispatch => ({
  close: id => dispatch(toggleDrawer(id)),
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentIndex: index => dispatch(setIndex(index)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  shuffle: () => dispatch(shufflePlaylist()),
  addToPlaylist: collection => dispatch(pushPlaylist(collection))
});

export default connect(
  mapStateToProps,
  dispatchMapToProps
)(withStyles(AlbumDrawerStyle)(AlbumDrawer));
