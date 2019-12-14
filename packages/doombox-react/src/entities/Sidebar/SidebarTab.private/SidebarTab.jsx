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
import {
  Dialog,
  FormCreatePlaylist
} from '../../../modules';

// Hooks
import {
  useAudio,
  useRoute
} from '../../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../../utils/const';

// Style
import { useSidebarTabStyles } from './SidebarTab.style';

const SidebarTab = () => {
  const [open, setOpen] = useState(false);

  const { collection } = useAudio(HOOK.AUDIO.PLAYLIST);
  const { setPage } = useRoute(HOOK.ROUTE.METHOD);

  const classes = useSidebarTabStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.sticky}>
          <IconButton
            classes={{ root: classes.button }}
            onClick={() => setPage(PATH.PAGE.VISUALIZER)}
          >
            <Icon type="visualizer" fontSize="inherit" />
          </IconButton>
          <IconButton
            classes={{ root: classes.button }}
            onClick={() => setPage(PATH.PAGE.ALBUM)}
          >
            <IconAlbum fontSize="inherit" />
          </IconButton>
          <IconButton
            classes={{ root: classes.button }}
            onClick={() => setPage(PATH.PAGE.SONG)}
          >
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

export default SidebarTab;
