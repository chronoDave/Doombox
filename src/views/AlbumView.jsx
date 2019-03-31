import React from 'react';
import { connect } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AlbumItem from '../components/AlbumItem/AlbumItem';

// Actions
import { fetchSongs } from '../actions/databaseActions';

// Style
import AlbumViewStyle from './AlbumViewStyle';

const AlbumView = props => {
  const {
    albumList,
    classes,
    getSongs,
    toggleMenu,
    selectedId
  } = props;

  const handleClick = (index, id) => {
    getSongs(id);
  };

  return (
    <AutoSizer>
      {({ height, width }) => {
        const itemWidth = 166;
        const itemHeight = 270;
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
  );
};

AlbumView.propTypes = {
  albumList: PropTypes.array,
  classes: PropTypes.object.isRequired,
  getSongs: PropTypes.func,
  toggleMenu: PropTypes.func,
  selectedId: PropTypes.number
};

const mapStateToProps = state => ({
  albumList: state.list.albumList,
  selectedId: state.window.id,
});

const mapDispatchToProps = dispatch => ({
  getSongs: id => dispatch(fetchSongs(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(AlbumViewStyle)(AlbumView));
