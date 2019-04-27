import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemText from '@material-ui/core/ListItemText';

import ViewHeader from '../components/ViewHeader/ViewHeader';
import { SongItem } from '../components/ViewItem';
import { GridContainer, GridItem } from '../components/Grid';

// Actions
import { setStatus, setPosition, setSong } from '../actions/songActions';

// Style
import SearchViewStyle from './SearchViewStyle';

const SearchView = props => {
  const {
    classes,
    query,
    collection,
    setCurrentSong,
    resetPosition,
    setPlaying
  } = props;

  const size = collection.length;

  const handleClick = index => {
    setCurrentSong(collection[index]);
    resetPosition();
    setPlaying();
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
      {collection.length !== 0 ? (
        <Fragment>
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
                itemCount={size}
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
        </Fragment>
      ) : null}
    </div>
  );
};

SearchView.propTypes = {
  classes: PropTypes.object.isRequired,
  query: PropTypes.string,
  collection: PropTypes.array,
  setCurrentSong: PropTypes.func,
  resetPosition: PropTypes.func,
  setPlaying: PropTypes.func
};

const mapStateToProps = state => ({
  collection: state.list.searchList,
  query: state.list.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentSong: song => dispatch(setSong(song)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SearchViewStyle)(SearchView));
