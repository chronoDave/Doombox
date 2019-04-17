import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';

import { GridContainer, GridItem } from '../components/Grid';
import ViewHeader from '../components/ViewHeader/ViewHeader';
import { SongItem } from '../components/ViewItem';

// Actions
import {
  setStatus,
  setPosition,
} from '../actions/songActions';
import {
  shufflePlaylist,
  setPlaylist,
} from '../actions/playlistActions';

// Style
import SongViewStyle from './SongViewStyle';

const SongView = props => {
  const {
    size,
    classes,
    songList,
    resetPosition,
    setCurrentPlaylist,
    setPlaying,
    shuffle,
    songId
  } = props;

  const handlePlay = () => {
    const collection = songList.reduce((acc, val) => acc.concat(val), []);
    setCurrentPlaylist(collection);
    resetPosition();
    setPlaying();
  };

  const handleShuffle = () => {
    handlePlay();
    shuffle();
  };

  const handleClick = index => {
    setCurrentPlaylist([songList[index]]);
    resetPosition();
    setPlaying();
  };

  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title="Song collection"
        type="songs"
      >
        <IconButton
          classes={{ root: classes.icon }}
          onClick={() => handlePlay()}
        >
          <PlayIcon />
        </IconButton>
        <IconButton
          classes={{ root: classes.icon }}
          onClick={() => handleShuffle()}
        >
          <ShuffleIcon />
        </IconButton>
      </ViewHeader>
      <div className={classes.listHeader}>
        <GridContainer
          wrap="nowrap"
          justify="space-between"
          alignItems="flex-end"
          classes={{ root: classes.grid }}
        >
          <GridItem xs={3}>
            <ListItemText
              primary="Title"
            />
          </GridItem>
          <GridItem xs={2}>
            <ListItemText
              primary="Artist"
            />
          </GridItem>
          <GridItem xs={3}>
            <ListItemText
              primary="Album"
            />
          </GridItem>
          <GridItem xs={2}>
            <ListItemText
              primary="Label"
            />
          </GridItem>
          <ListItemText
            primary="Duration"
            classes={{ root: classes.duration }}
          />
        </GridContainer>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height - 272}
            itemCount={size - 1}
            itemSize={50}
            width={width}
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
              } = songList[index];

              return (
                <SongItem
                  onClick={() => handleClick(index)}
                  active={_id === songId}
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
    </div>
  );
};

SongView.propTypes = {
  size: PropTypes.number,
  classes: PropTypes.object.isRequired,
  songList: PropTypes.array,
  resetPosition: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
  setPlaying: PropTypes.func,
  shuffle: PropTypes.func,
  songId: PropTypes.string
};

const mapStateToProps = state => ({
  size: state.list.songSize,
  songList: state.list.songList,
  songIndex: state.song.index,
  songId: state.song.id
});

const mapDispatchToProps = dispatch => ({
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  shuffle: () => dispatch(shufflePlaylist()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SongViewStyle)(SongView));
