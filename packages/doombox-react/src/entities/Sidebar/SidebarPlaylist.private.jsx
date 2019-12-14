import React from 'react';
import clsx from 'clsx';

// Core
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useSidebarStyles } from './Sidebar.style';

const SidebarPlaylist = () => {
  const { name, collection } = useAudio(HOOK.AUDIO.PLAYLIST);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const { goTo } = useAudio(HOOK.AUDIO.METHOD);

  const classes = useSidebarStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      minHeight={0}
    >
      <Box p={1}>
        <Typography
          variant="subtitle2"
          align="center"
          classes={{ root: classes.noWrap }}
        >
          {name}
        </Typography>
      </Box>
      <div className={classes.playlist}>
        <List disablePadding dense>
          {collection.map(({ _id, metadata }, index) => (
            <ListItem
              key={_id}
              className={clsx({ [classes.active]: current === _id })}
              button
              onClick={() => goTo(index)}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <Typography variant="caption">
                  {index}
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={metadata.title}
                primaryTypographyProps={{ className: classes.noWrap }}
                secondary={metadata.artist}
                secondaryTypographyProps={{ className: classes.noWrap }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default SidebarPlaylist;
