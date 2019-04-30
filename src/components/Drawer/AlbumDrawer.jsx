import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
import { getDurationFormat } from '../../utils';

// Style
import AlbumDrawerStyle from './AlbumDrawerStyle';

const AlbumDrawer = props => {
  const {
    open,
    close,
    classes,
    setPlaying,
    resetPosition,
    setCurrentPlaylist,
    setCurrentIndex,
    addToPlaylist,
    shuffle,
    menuId,
    album,
    currentSongId,
    albumIndex
  } = props;

  const handlePlay = () => {
    setCurrentIndex(0);
    setCurrentPlaylist(album);
    resetPosition();
    setPlaying();
  };

  const handleShuffle = () => {
    handlePlay();
    shuffle();
  };

  const handleAddPlaylist = () => {
    addToPlaylist(album);
  };

  const handleClick = index => {
    handlePlay();
    setCurrentIndex(index);
  };

  return (
    <Drawer
      open={open}
      onClose={() => close(menuId, albumIndex)}
      anchor="right"
      classes={{
        paper: classNames(classes.root, classes.scrollbar)
      }}
    >
      <List
        subheader={<Img cover={album[0].cover} />}
        disablePadding
      >
        <ListItem classes={{ root: classes.listItemTitle }}>
          <GridContainer
            wrap="nowrap"
            alignItems="center"
            justify="space-between"
          >
            <ListItemText
              primary={album[0].album}
              primaryTypographyProps={{
                variant: 'h4'
              }}
              secondary={album[0].label}
              secondaryTypographyProps={{
                variant: 'subtitle1'
              }}
              classes={{
                secondary: classes.light
              }}
            />
            <ListItemText
              primary={album[0].year}
              primaryTypographyProps={{
                variant: 'subtitle2',
                align: 'right'
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
                primary={getDurationFormat(album
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
        {album.map((song, index) => (
          <ListItem
            className={song._id === currentSongId ? classes.active : undefined}
            key={song._id}
            classes={{ container: classes.listItemSong }}
            button
            onClick={() => handleClick(index)}
          >
            <ListItemIcon classes={{ root: classes.listItemSongIcon }}>
              {song.track && (
                <ListItemText
                  primary={`${song.track}.`}
                  classes={{ root: classes.listItemSongIcon }}
                />
              )}
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
    </Drawer>
  );
};

AlbumDrawer.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  classes: PropTypes.object.isRequired,
  setPlaying: PropTypes.func,
  resetPosition: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
  setCurrentIndex: PropTypes.func,
  addToPlaylist: PropTypes.func,
  shuffle: PropTypes.func,
  menuId: PropTypes.number,
  album: PropTypes.array,
  currentSongId: PropTypes.string,
  albumIndex: PropTypes.number
};

const mapStateToProps = state => ({
  open: state.window.drawer,
  menuId: state.window.id,
  albumIndex: state.window.albumIndex,
  currentSongId: state.song._id
});

const dispatchMapToProps = dispatch => ({
  close: (id, index) => dispatch(toggleDrawer(id, index)),
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
