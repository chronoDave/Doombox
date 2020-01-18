import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import {
  Box,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';

import {
  AvatarButton,
  Typography,
  Popover
} from '../../components';

// Modules
import {
  DialogForm,
  DialogConfirmation
} from '../Dialog';
import { FormPlaylist } from '../Form';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Actions
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist
} from '../../actions';

// Style
import { useNavigationStyles } from './Navigation.style';

const NavigationPlaylist = () => {
  const [dialog, setDialog] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState({});

  const collection = useAudio(HOOK.AUDIO.COLLECTION);
  const { setPlaylist } = useAudio(HOOK.AUDIO.METHOD);

  const classes = useNavigationStyles();
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className={classes.playlist}>
        {collection.map(playlist => (
          <Tooltip
            key={playlist._id}
            title={(
              <Typography variant="caption">
                {`${playlist.name} - ${playlist.collection.length} songs`}
              </Typography>
            )}
            arrow
            placement="right"
          >
            <AvatarButton
              alt={playlist.name}
              src={playlist.src ? playlist.src.path : null}
              className={classes.avatar}
              onClick={() => setPlaylist(playlist.name, playlist.collection, playlist.src)}
              onContextMenu={event => {
                setAnchorEl(event.currentTarget);
                setMenu(playlist);
              }}
            />
          </Tooltip>
        ))}
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => setDialog('create')}
        >
          <IconAdd />
        </IconButton>
      </div>
      <DialogConfirmation
        title={t('action:delete', { context: 'playlist' })}
        open={dialog === 'delete'}
        primary={menu.name}
        onClose={() => {
          setDialog(null);
          setAnchorEl(null);
        }}
        onConfirm={() => {
          setDialog(null);
          deletePlaylist(menu._id);
        }}
      />
      <DialogForm
        open={dialog === 'create'}
        onClose={() => setDialog(null)}
        title={t('action:create', { context: 'playlist' })}
        disableTranslation
        form={(
          <FormPlaylist
            onSubmit={payload => {
              createPlaylist(payload);
              setDialog(null);
            }}
          />
        )}
      />
      <DialogForm
        open={dialog === 'edit'}
        onClose={() => setDialog(null)}
        title={t('action:edit', { context: 'playlist' })}
        disableTranslation
        form={(
          <FormPlaylist
            initialValues={{ name: menu.name, src: menu.src }}
            onSubmit={payload => {
              updatePlaylist(menu._id, payload);
              setDialog(null);
              setAnchorEl(null);
            }}
          />
        )}
      />
      <Popover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Box p={1}>
          <List dense disablePadding>
            <ListItem
              button
              onClick={() => setDialog('edit')}
              classes={{ root: classes.listItem }}
            >
              <ListItemText primary={t('action:edit', { context: 'playlist' })} />
            </ListItem>
            <Box p={0.75}>
              <Divider />
            </Box>
            <ListItem
              button
              onClick={() => setDialog('delete')}
              classes={{ root: classes.listItem }}
            >
              <ListItemText
                primary={t('action:delete', { context: 'playlist' })}
                primaryTypographyProps={{ classes: { root: classes.delete } }}
              />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default NavigationPlaylist;
