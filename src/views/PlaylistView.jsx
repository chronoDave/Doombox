import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import classNames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

import { GridContainer } from '../components/Grid';
import ViewHeader from '../components/ViewHeader/ViewHeader';
import { SongItem } from '../components/ViewItem';

// Style
import PlaylistViewStyle from './PlaylistViewStyle';

const PlaylistView = props => {
  const { classes, size, playlist, songId } = props;
  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title="Playlist collection"
        type="songs"
      >
        <div>Playerholders</div>
      </ViewHeader>
      <GridContainer fullHeight>
        <div>a</div>
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
                } = playlist[index];

                return (
                  <SongItem
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
      </GridContainer>
    </div>
  );
};

PlaylistView.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.array,
  size: PropTypes.number,
  songId: PropTypes.string
};

const mapStateToProps = state => ({
  size: state.playlist.size,
  playlist: state.playlist.collection,
  songId: state.song.id
});

export default connect(
  mapStateToProps
)(withStyles(PlaylistViewStyle)(PlaylistView));
