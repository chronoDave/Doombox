import React, { memo } from 'react';
import { areEqual } from "react-window";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddPlaylistIcon from '@material-ui/icons/PlaylistAdd';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';

import { GridContainer, GridItem } from '../Grid';
import Img from '../Img/Img';

// Actions
import {
  setStatus,
  setPosition,
  setSong
} from '../../actions/songActions';
import {
  pushPlaylist,
  setPlaylist,
  setIndex
} from '../../actions/playlistActions';

// Style
import AlbumItemStyle from './AlbumItemStyle';

const AlbumItem = memo(
  props => {
    const {
      album,
      cover,
      classes,
      style,
      name,
      label,
      size,
      onClick,
      active,
      setPlaying,
      resetPosition,
      setCurrentPlaylist,
      setCurrentIndex,
      addToPlaylist,
      setCurrentSong
    } = props;

    const handlePlay = () => {
      setCurrentIndex(0);
      setCurrentPlaylist(album);
      resetPosition();
      setCurrentSong(album[0]);
      setPlaying();
    };

    const handleAddPlaylist = () => {
      addToPlaylist(album);
    };

    return (
      <div style={style}>
        <div className={classNames(
          classes.root,
          active ? classes.active : undefined
        )}>
          <GridContainer
            direction="column"
            justify="space-between"
            wrap="nowrap"
            fullHeight
          >
            <ButtonBase
              onClick={onClick}
              classes={{ root: classes.imageContainer }}
            >
              <Img
                cover={cover}
                alt={`${name} album cover.`}
              />
            </ButtonBase>
            <div>
              <div className={classes.textContainer}>
                <Typography
                  variant="body1"
                  noWrap
                >
                  {name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  noWrap
                >
                  {label}
                </Typography>
              </div>
              <GridContainer
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <GridItem>
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
                </GridItem>
                <GridItem xs classes={{ root: classes.textContainer }}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    align="right"
                  >
                    {`${size} songs`}
                  </Typography>
                </GridItem>
              </GridContainer>
            </div>
          </GridContainer>
        </div>
      </div>
    );
  },
  areEqual
);

const dispatchMapToProps = dispatch => ({
  setPlaying: () => dispatch(setStatus('PLAYING')),
  resetPosition: () => dispatch(setPosition(0)),
  setCurrentSong: song => dispatch(setSong(song)),
  setCurrentIndex: index => dispatch(setIndex(index)),
  setCurrentPlaylist: collection => dispatch(setPlaylist(collection)),
  addToPlaylist: collection => dispatch(pushPlaylist(collection))
});

AlbumItem.propTypes = {
  cover: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  setCurrentSong: PropTypes.func,
  album: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  setPlaying: PropTypes.func,
  resetPosition: PropTypes.func,
  setCurrentPlaylist: PropTypes.func,
  setCurrentIndex: PropTypes.func,
  addToPlaylist: PropTypes.func,
};

export default connect(
  null,
  dispatchMapToProps
)(withStyles(AlbumItemStyle)(AlbumItem));
