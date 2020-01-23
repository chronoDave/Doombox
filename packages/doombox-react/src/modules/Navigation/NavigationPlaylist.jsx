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
  IconButton
} from '@material-ui/core';

import {
  AvatarButton,
  Context,
  ContextItem,
  Tooltip
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
  const { name } = useAudio(HOOK.AUDIO.PLAYLIST);

  const classes = useNavigationStyles();
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className={classes.playlist}>
        {collection.map(playlist => (
          <Tooltip
            key={playlist._id}
            disableTranslation
            title={`${playlist.name} (${t('trackCount', { count: playlist.collection.length })})`}
            placement="right"
          >
            <Box display="flex" alignItems="center">
              <AvatarButton
                alt={playlist.name}
                src={playlist.src ? playlist.src.path : null}
                className={classes.avatar}
                size={6}
                onClick={() => setPlaylist(playlist.name, playlist.collection, playlist.src)}
                onContextMenu={event => {
                  setAnchorEl(event.currentTarget);
                  setMenu(playlist);
                }}
              />
              {playlist.name === name && <div className={classes.activeBar} />}
            </Box>
          </Tooltip>
        ))}
        <Tooltip
          disableTranslation
          title={t('action:create', { context: 'playlist' })}
          placement="right"
        >
          <IconButton
            classes={{ root: classes.iconButton }}
            onClick={() => setDialog('create')}
          >
            <IconAdd />
          </IconButton>
        </Tooltip>
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
            initialValues={{ name: menu.name || '', src: menu.src || {} }}
            onSubmit={payload => {
              updatePlaylist(menu._id, payload);
              setDialog(null);
              setAnchorEl(null);
            }}
          />
        )}
      />
      <Context
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <ContextItem
          disableTranslation
          primary={t('action:edit', { context: 'playlist' })}
          onClick={() => setDialog('edit')}
        />
        <ContextItem
          disableTranslation
          primary={t('action:delete', { context: 'playlist' })}
          primaryTypographyProps={{ color: 'error' }}
          onClick={() => setDialog('delete')}
        />
      </Context>
    </Fragment>
  );
};

export default NavigationPlaylist;
