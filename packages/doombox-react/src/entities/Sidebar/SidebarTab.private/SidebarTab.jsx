import React, {
  Fragment,
  useState
} from 'react';

// Icons
import IconAdd from '@material-ui/icons/Add';
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  Button,
  IconButton,
  Divider
} from '@material-ui/core';

import {
  Icon,
  ButtonAvatar
} from '../../../components';

// Modules
import { FormCreatePlaylist } from '../../../modules';

// Template
import { DialogFormTemplate } from '../../../templates';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import { HOOK } from '../../../utils/const';

// Style
import { useSidebarTabStyles } from './SidebarTab.style';

const SidebarTab = () => {
  const [open, setOpen] = useState(false);
  const { collection } = useAudio(HOOK.AUDIO.PLAYLIST);
  const classes = useSidebarTabStyles();

  console.log(collection);

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.sticky}>
          <IconButton classes={{ root: classes.button }}>
            <Icon type="playlist" fontSize="inherit" />
          </IconButton>
          <IconButton classes={{ root: classes.button }}>
            <IconAlbum fontSize="inherit" />
          </IconButton>
          <IconButton classes={{ root: classes.button }}>
            <IconSong fontSize="inherit" />
          </IconButton>
          <IconButton classes={{ root: classes.button }}>
            <IconSettings fontSize="inherit" />
          </IconButton>
        </div>
        <Box my={0.5}>
          <Divider />
        </Box>
        <div className={classes.scrollable}>
          {collection.map(playlist => (
            <ButtonAvatar
              key={playlist._id}
              title={playlist.name}
              src={playlist.src}
              className={classes.avatar}
            />
          ))}
          <IconButton
            classes={{ root: classes.button }}
            onClick={() => setOpen(true)}
          >
            <IconAdd />
          </IconButton>
        </div>
      </div>
      <DialogFormTemplate
        open={open}
        onClose={() => setOpen(false)}
        title="Create playlist"
      >
        <FormCreatePlaylist>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </FormCreatePlaylist>
      </DialogFormTemplate>
    </Fragment>
  );
};

export default SidebarTab;
