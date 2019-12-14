import React, {
  Fragment,
  useState
} from 'react';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import {
  Button,
  IconButton
} from '@material-ui/core';

import { ButtonAvatar } from '../../components';

// Modules
import {
  Dialog,
  FormCreatePlaylist
} from '../../modules';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useSidebarStyles } from './Sidebar.style';

const SidebarCollection = () => {
  const [open, setOpen] = useState(false);

  const collection = useAudio(HOOK.AUDIO.COLLECTION);
  const classes = useSidebarStyles();

  return (
    <Fragment>
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
          onClick={() => setOpen(true)}
        >
          <IconAdd />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create playlist"
      >
        <FormCreatePlaylist>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </FormCreatePlaylist>
      </Dialog>
    </Fragment>
  );
};

export default SidebarCollection;
