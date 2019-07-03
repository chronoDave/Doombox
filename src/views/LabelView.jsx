import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';
import _ from 'lodash';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

import ViewHeader from '../components/ViewHeader/ViewHeader';
import { LabelItem } from '../components/ViewItem';

// Actions
import { setStatus, setPosition } from '../actions/songActions';
import { shufflePlaylist, setPlaylist } from '../actions/playlistActions';

// Style
import LabelViewStyle from './LabelViewStyle';

const LabelView = props => {
  const {
    classes,
    size,
    labelList,
    setCurrentPlaylist,
    resetPosition,
    setPlaying,
    shuffle,
  } = props;

  const handlePlay = () => {
    const collection = labelList.reduce((acc, val) => acc.concat(val), []);
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
        title="Label collection"
        type="labels"
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
          const itemWidth = 336;
          const itemHeight = 338;
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
              overscanColumnsCount={3}
              overscanRowCount={rowCount}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * itemCount + columnIndex;

                if (index > size - 1) return null;
                const albums = _.chain(labelList[index])
                  .groupBy(label => label.album)
                  .toPairs()
                  .map(array => array[1])
                  .sortBy(array => array[0].year)
                  .value();

                const { label, _id } = labelList[index][0];
                return (
                  <LabelItem
                    style={style}
                    key={_id}
                    index={index}
                    label={label}
                    collection={labelList[index]}
                    albums={albums}
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

const mapStateToProps = state => ({
  size: state.list.labelSize,
  labelList: state.list.labelList,
  view: state.window.view
});

const mapDispatchToProps = dispatch => ({
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  shuffle: () => dispatch(shufflePlaylist()),
});

LabelView.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number,
  labelList: PropTypes.array,
  setCurrentPlaylist: PropTypes.func,
  resetPosition: PropTypes.func,
  setPlaying: PropTypes.func,
  shuffle: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(LabelViewStyle)(LabelView));
