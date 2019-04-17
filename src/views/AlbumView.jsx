import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

import { AlbumItem } from '../components/ViewItem';
import ViewHeader from '../components/ViewHeader/ViewHeader';

// Actions
import { toggleDrawer } from '../actions/windowActions';
import {
  setStatus,
  setPosition,
} from '../actions/songActions';
import {
  shufflePlaylist,
  setPlaylist,
} from '../actions/playlistActions';

// Style
import AlbumViewStyle from './AlbumViewStyle';

const AlbumView = props => {
  const {
    albumList,
    classes,
    toggleAlbumDrawer,
    setCurrentPlaylist,
    resetPosition,
    setPlaying,
    shuffle,
    size,
    songId
  } = props;

  const handleClick = index => {
    toggleAlbumDrawer(index);
  };

  const handlePlay = () => {
    const collection = albumList.reduce((acc, val) => acc.concat(val), []);
    setCurrentPlaylist(collection);
    resetPosition();
    setPlaying();
  };

  const handleShuffle = () => {
    handlePlay();
    shuffle();
  };

  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title="Album collection"
        type="albums"
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
      <AutoSizer>
        {({ height, width }) => {
          const itemWidth = 210;
          const itemHeight = 300;
          const itemCount = Math.floor(width / (itemWidth + 5));
          const rowCount = Math.ceil(size / itemCount);

          return (
            <Grid
              className={classes.scrollbar}
              // Amount of items
              rowCount={rowCount}
              columnCount={itemCount}
              // Item dimensions
              columnWidth={itemWidth}
              rowHeight={itemHeight}
              // Container dimensions
              width={width}
              height={height - 192}
              // Overscan
              overscanColumnsCount={5}
              overscanRowCount={rowCount}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * itemCount + columnIndex;

                if (index > size - 1) return null;
                const { cover, label, album, id } = albumList[index][0];
                return (
                  <AlbumItem
                    onClick={() => handleClick(index)}
                    album={albumList[index]}
                    key={id}
                    style={style}
                    cover={cover}
                    name={album}
                    label={label}
                    size={albumList[index].length}
                    active={albumList[index].map(song => song._id).includes(songId)}
                  />
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

AlbumView.propTypes = {
  albumList: PropTypes.array,
  classes: PropTypes.object.isRequired,
  toggleAlbumDrawer: PropTypes.func,
  songId: PropTypes.string,
  setCurrentPlaylist: PropTypes.func,
  resetPosition: PropTypes.func,
  setPlaying: PropTypes.func,
  shuffle: PropTypes.func,
  size: PropTypes.number
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  songId: state.song.id,
  size: state.list.albumSize,
  selectedId: state.window.id,
});

const mapDispatchToProps = dispatch => ({
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  shuffle: () => dispatch(shufflePlaylist()),
  toggleAlbumDrawer: index => dispatch(toggleDrawer(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(AlbumViewStyle)(AlbumView));
