import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

import ViewHeader from '../components/ViewHeader/ViewHeader';
import { SongItem } from '../components/ViewItem';

// Actions
import { setIndex } from '../actions/playlistActions';
import { setStatus, setPosition } from '../actions/songActions';

// Style
import SearchViewStyle from './SearchViewStyle';

const SearchView = props => {
  const {
    classes,
    size,
    query,
    collection,
    setPlaylistIndex,
    setStatusPlaying,
    resetSongPosition,
  } = props;

  const handleClick = index => {
    resetSongPosition(0);
    setPlaylistIndex(index);
    setStatusPlaying();
  };

  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title={`Search results for "${query}"`}
        type="results"
      >
        <div>Playerholders</div>
      </ViewHeader>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height - 272}
            itemCount={size}
            itemSize={50}
            width={width - 316}
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
              } = collection[index];

              return (
                <SongItem
                  onClick={() => handleClick(index)}
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

SearchView.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number,
  query: PropTypes.string,
  collection: PropTypes.array,
  setPlaylistIndex: PropTypes.func,
  setStatusPlaying: PropTypes.func,
  resetSongPosition: PropTypes.func,
};

const mapStateToProps = state => ({
  collection: state.list.searchList,
  size: state.list.searchSize,
  query: state.list.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  setPlaylistIndex: index => dispatch(setIndex(index)),
  setStatusPlaying: () => dispatch(setStatus('PLAYING')),
  resetSongPosition: () => dispatch(setPosition(0)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SearchViewStyle)(SearchView));
