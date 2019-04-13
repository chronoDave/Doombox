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
import IconButton from '@material-ui/core/IconButton';

import AlbumItem from '../components/AlbumItem/AlbumItem';
import Typography from '../components/Typography/Typography';
import Divider from '../components/Divider/Divider';
import { GridContainer } from '../components/Grid';

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
    selectedId,
    setCurrentPlaylist,
    resetPosition,
    setPlaying,
    shuffle,
    size
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
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h4">Album collection</Typography>
        <Typography variant="body1">{`${size} albums`}</Typography>
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
          const itemWidth = 180;
          const itemHeight = 270;
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
              height={height}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * itemCount + columnIndex;
                const { cover, label, album, id } = albumList[index][0];

                return (
                  index < size && (
                    <AlbumItem
                      onClick={() => handleClick(index, id)}
                      key={index}
                      style={style}
                      cover={cover}
                      name={album}
                      label={label}
                      size={albumList[index].length}
                      active={selectedId === id}
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
  toggleAlbumDrawer: PropTypes.func,
  selectedId: PropTypes.number,
  setCurrentPlaylist: PropTypes.func,
  resetPosition: PropTypes.func,
  setPlaying: PropTypes.func,
  shuffle: PropTypes.func,
  size: PropTypes.number
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
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
