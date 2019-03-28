import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import ImgCover from '../ImgCover/ImgCover';
import SideMenuButtons from '../SideMenuButtons/SideMenuButtons';
import SideMenuItem from '../SideMenuItem/SideMenuItem';

// Actions
import {
  setPosition, setStatus,
} from '../../actions/songActions';
import {
  shufflePlaylist,
  pushPlaylist,
  setCustomPlaylist,
  setPlaylistIndex
} from '../../actions/playlistActions';

// Utils
import { getDurationFormat } from '../../functions';

// Style
import SideMenuStyle from './SideMenuStyle';

const SideMenu = props => {
  const {
    open,
    classes,
    onClose,
    songs,
    label,
    cover,
    setCurrentStatus,
    shuffleCurrentPlaylist,
    setCurrentCustomPlaylist,
    pushCurrentPlaylist,
    setCurrentIndex,
    songId
  } = props;

  const getTotalLength = () => Object.values(songs)
    .map(song => song.duration)
    .reduce((accumulator, current) => accumulator + current);

  const handlePlay = () => {
    setCurrentCustomPlaylist(songs.map(song => song._id));
    setCurrentStatus('PLAYING');
  };

  const handleShuffle = () => {
    handlePlay();
    shuffleCurrentPlaylist();
  };

  const handleCustomPlaylist = () => {
    pushCurrentPlaylist(songs.map(song => song._id));
  };

  const handleClick = index => {
    setCurrentIndex(index);
    setCurrentCustomPlaylist(songs.map(song => song._id));
    setCurrentStatus('PLAYING');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{
        paper: classNames(classes.root, classes.scrollbar)
      }}
    >
      {songs ? (
        <List
          subheader={<ImgCover big cover={cover} />}
          disablePadding
        >
          <ListItem classes={{ root: classes.listItemHeader }}>
            <ListItemText
              primary={songs[0].album}
              primaryTypographyProps={{
                variant: 'h4'
              }}
              secondary={label}
              secondaryTypographyProps={{
                variant: 'subtitle1',
                color: 'default'
              }}
              classes={{ primary: classes.listItemTextPrimary }}
            />
            <ListItemText
              primary={songs[0].year}
              primaryTypographyProps={{
                align: 'right',
                variant: 'subtitle1',
                color: 'textSecondary'
              }}
            />
          </ListItem>
          <ListItem>
            <SideMenuButtons
              onClickPlay={() => handlePlay()}
              onClickShuffle={() => handleShuffle()}
              onClickAddToPlaylist={() => handleCustomPlaylist()}
              duration={getDurationFormat(getTotalLength())}
            />
          </ListItem>
          {songs.map((song, index) => (
            <SideMenuItem
              key={song._id}
              track={song.track}
              title={song.title}
              artist={song.artist}
              active={song._id === songId}
              duration={getDurationFormat(song.duration)}
              onClick={() => handleClick(index)}
            />
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </Drawer>
  );
};

SideMenu.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  songs: PropTypes.array,
  cover: PropTypes.string,
  setCurrentStatus: PropTypes.func,
  shuffleCurrentPlaylist: PropTypes.func,
  setCurrentCustomPlaylist: PropTypes.func,
  pushCurrentPlaylist: PropTypes.func,
  setCurrentIndex: PropTypes.func,
  songId: PropTypes.string,
  label: PropTypes.string
};

const mapStateToProps = state => ({
  status: state.song.playStatus,
  isCustom: state.playlist.isCustom,
  songId: state.song.id
});

const mapDispatchToProps = dispatch => ({
  setCurrentStatus: status => dispatch(setStatus(status)),
  setCurrentPosition: position => dispatch(setPosition(position)),
  setCurrentCustomPlaylist: collection => dispatch(setCustomPlaylist(collection)),
  setCurrentIndex: index => dispatch(setPlaylistIndex(index)),
  shuffleCurrentPlaylist: () => dispatch(shufflePlaylist()),
  pushCurrentPlaylist: collection => dispatch(pushPlaylist(collection))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SideMenuStyle)(SideMenu));
