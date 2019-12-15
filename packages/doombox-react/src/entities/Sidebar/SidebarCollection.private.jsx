import React from 'react';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import { IconButton } from '@material-ui/core';

import { ButtonAvatar } from '../../components';

// Hooks
import {
  useAudio,
  useRoute
} from '../../hooks';

// Utils
import { HOOK, PATH } from '../../utils/const';

// Style
import { useSidebarStyles } from './Sidebar.style';

const SidebarCollection = () => {
  const { openDialog } = useRoute(HOOK.ROUTE.METHOD);
  const collection = useAudio(HOOK.AUDIO.COLLECTION);
  const classes = useSidebarStyles();

  return (
    <div className={classes.collection}>
      {collection.map(playlist => (
        <ButtonAvatar
          key={playlist._id}
          title={playlist.name}
          src={playlist.src}
          className={classes.avatar}
        />
      ))}
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => openDialog(PATH.DIALOG.PLAYLIST.CREATE)}
      >
        <IconAdd />
      </IconButton>
    </div>
  );
};

export default SidebarCollection;
