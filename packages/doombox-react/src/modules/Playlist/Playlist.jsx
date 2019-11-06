import React from 'react';

// Core
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import PlaylistBanner from './PlaylistBanner';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { zeroPadding } from '../../utils';
import { AUDIO_HOOKS } from '../../utils/const';

// Style
import { usePlaylistStyle } from './Playlist.style';

const Playlist = ({ ...rest }) => {
  const { playlist } = useAudio(AUDIO_HOOKS.PLAYLIST);
  const { current } = useAudio(AUDIO_HOOKS.CURRENT);
  const { play } = useAudio(AUDIO_HOOKS.STATIC);
  const classes = usePlaylistStyle();

  return (
    <Box width="100%" {...rest}>
      <PlaylistBanner />
      <List dense>
        {playlist.map((song, index) => (
          <ListItem
            key={song._id}
            className={current && current._id === song._id ? classes.active : null}
            button
            onClick={() => play(index)}
            divider
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              {`.${zeroPadding(index + 1)}`}
            </ListItemIcon>
            <ListItemText
              primary={song.title}
              secondary={song.artist}
              primaryTypographyProps={{
                className: classes.noWrap,
                classes: { root: classes.primaryRoot }
              }}
              secondaryTypographyProps={{
                className: classes.noWrap,
                color: 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Playlist;
