import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { areEqual } from "react-window";
import { connect } from 'react-redux';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddPlaylistIcon from '@material-ui/icons/PlaylistAdd';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';

import { GridContainer } from '../Grid';
import Divider from '../Divider/Divider';
import Img from '../Img/Img';

// Actions
import { toggleDrawer } from '../../actions/windowActions';
import {
  setStatus,
  setPosition
} from '../../actions/songActions';
import {
  shufflePlaylist,
  pushPlaylist,
  setPlaylist,
  setIndex
} from '../../actions/playlistActions';

// Style
import LabelItemStyle from './LabelItemStyle';

const LabelItem = memo(
  props => {
    const {
      style,
      label,
      albums,
      classes,
      index,
      toggleAlbumDrawer,
      collection,
      setCurrentIndex,
      setCurrentPlaylist,
      resetPosition,
      setPlaying,
      addToPlaylist,
      shuffle
    } = props;

    const handlePlay = () => {
      setCurrentIndex(0);
      setCurrentPlaylist(collection);
      resetPosition();
      setPlaying();
    };

    const handleAddPlaylist = () => {
      addToPlaylist(collection);
    };

    const handleShuffle = () => {
      handlePlay();
      shuffle();
    };

    return (
      <div style={style}>
        <div className={classes.root}>
          <GridContainer
            wrap="nowrap"
            direction="column"
            classes={{ root: classes.headerContainer }}
          >
            <GridContainer
              wrap="nowrap"
              justify="space-between"
              alignItems="flex-end"
              classes={{ root: classes.textContainer }}
            >
              <Typography
                variant="h5"
                noWrap
              >
                {label}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                noWrap
              >
                {`${albums.length} album${albums.length !== 1 ? 's' : ''}`}
              </Typography>
            </GridContainer>
            <Divider light />
            <GridContainer
              classes={{ root: classes.iconContainer }}
              alignItems="center"
            >
              <IconButton
                onClick={() => handlePlay()}
                classes={{ root: classes.icon }}
              >
                <PlayIcon />
              </IconButton>
              <IconButton
                onClick={() => handleAddPlaylist()}
                classes={{ root: classes.icon }}
              >
                <AddPlaylistIcon />
              </IconButton>
              <IconButton
                onClick={() => handleShuffle()}
                classes={{ root: classes.icon }}
              >
                <ShuffleIcon />
              </IconButton>
            </GridContainer>
            <Divider light />
          </GridContainer>
          <GridContainer
            classes={{ root: classes.albumContainer }}
            className={classes.scrollbar}
          >
            {albums.map((item, albumIndex) => {
              const { cover, album, artist } = item[0];

              return (
                <GridContainer
                  wrap="nowrap"
                  direction="column"
                  classes={{ root: classes.albumItemRoot }}
                >
                  <ButtonBase onClick={() => toggleAlbumDrawer(index, albumIndex)}>
                    <Img
                      cover={cover}
                      type="labelItem"
                      alt={`${album} album cover.`}
                    />
                  </ButtonBase>
                  <Typography
                    variant="body1"
                    noWrap
                  >
                    {album}
                  </Typography>
                  <Typography
                    variant="body1"
                    noWrap
                  >
                    {artist}
                  </Typography>
                </GridContainer>
              );
            })}
          </GridContainer>
        </div>
      </div>
    );
  },
  areEqual
);

LabelItem.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  label: PropTypes.string,
  albums: PropTypes.array,
  index: PropTypes.number,
  toggleAlbumDrawer: PropTypes.func,
  collection: PropTypes.array,
  setCurrentIndex: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
  resetPosition: PropTypes.func,
  setPlaying: PropTypes.func,
  addToPlaylist: PropTypes.func,
  shuffle: PropTypes.func
};

const dispatchMapToProps = dispatch => ({
  toggleAlbumDrawer: (songIndex, albumIndex) => dispatch(toggleDrawer(songIndex, albumIndex)),
  shuffle: () => dispatch(shufflePlaylist()),
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentIndex: index => dispatch(setIndex(index)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  addToPlaylist: collection => dispatch(pushPlaylist(collection))
});

export default connect(
  null,
  dispatchMapToProps
)(withStyles(LabelItemStyle)(LabelItem));
