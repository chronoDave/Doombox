import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import AlbumItem from '../components/AlbumItem/AlbumItem';
import Typography from '../components/Typography/Typography';
import Divider from '../components/Divider/Divider';
import { GridContainer } from '../components/Grid';

// Actions
import { fetchSongs } from '../actions/databaseActions';
import { toggleDrawer } from '../actions/windowActions';
import {
  setStatus,
  setPosition
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
    getSongs,
    toggleAlbumDrawer,
    selectedId,
    albumSize,
    setCurrentPlaylist,
    resetPosition,
    setPlaying,
    shuffle
  } = props;

  const handleClick = (index, id) => {
    getSongs(id);
    toggleAlbumDrawer(index);
  };

  const handlePlay = () => {
    const collection = Object.values(albumList).map(album => album.songs).reduce((acc, val) => acc.concat(val), []);
    setCurrentPlaylist(collection);
    resetPosition();
    setPlaying();
  };

  const handleShuffle = () => {
    handlePlay();
    shuffle();
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h4">Album collection</Typography>
        <Typography variant="body1">{`${albumSize} albums`}</Typography>
        <Divider light padding />
        <GridContainer
          wrap="nowrap"
          alignItems="center"
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
        </GridContainer>
      </div>
      <AutoSizer>
        {({ height, width }) => {
          const itemWidth = 210;
          const itemHeight = 300;
          const itemCount = Math.floor(width / (itemWidth + 5));
          const albumCount = albumList.length;
          const rowCount = Math.ceil(albumCount / itemCount);

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
              height={height}
              // Overscan
              overscanRowCount={rowCount}
              overscanColumnsCount={10}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * itemCount + columnIndex;
                const cover = albumList[index] ? albumList[index].cover : undefined;

                return (
                  index < albumCount && (
                    <AlbumItem
                      onClick={() => handleClick(index, albumList[index]._id)}
                      key={index}
                      style={style}
                      cover={cover}
                      name={albumList[index].name}
                      label={albumList[index].label}
                      size={albumList[index].songs.length}
                      active={selectedId === albumList[index]._id}
                    />
                  )
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </Fragment>
  );
};

AlbumView.propTypes = {
  albumList: PropTypes.array,
  classes: PropTypes.object.isRequired,
  getSongs: PropTypes.func,
  toggleAlbumDrawer: PropTypes.func,
  selectedId: PropTypes.number
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  selectedId: state.window.id,
  albumSize: state.list.albumSize
});

const mapDispatchToProps = dispatch => ({
  getSongs: id => dispatch(fetchSongs(id)),
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
