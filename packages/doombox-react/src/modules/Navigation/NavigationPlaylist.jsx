import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { ACTION } from '@doombox/utils';
import PropTypes from 'prop-types';

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

// Actions
import {
  fetchPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
} from '../../actions';

// Utils
import { propPlaylist } from '../../utils/propTypes';

// Style
import { useNavigationStyles } from './Navigation.style';

import libraryIconDefault from '../../static/images/libraryIconDefault.png';

const NavigationPlaylist = ({ active, mixography }) => {
  const [dialog, setDialog] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState({});

  const classes = useNavigationStyles();
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className={classes.playlist}>
        {mixography.map(playlist => (
          <Tooltip
            key={playlist._id || 'Default Playlist'}
            disableTranslation
            title={`${playlist._id === 'library' ?
              t('library') :
              playlist.name
            } (${t('trackCount', { count: playlist.size })})`}
            placement="right"
          >
            <Box display="flex" alignItems="center">
              <AvatarButton
                alt={playlist.name}
                src={playlist.src ?
                  playlist.src.path :
                  playlist._id === 'library' ?
                    libraryIconDefault :
                    null
                }
                className={classes.avatar}
                size={6}
                onClick={() => fetchPlaylist(
                  playlist._id,
                  ACTION.AUDIO.PLAYLIST_SET
                )}
                onContextMenu={event => {
                  if (playlist._id !== 'library') {
                    setAnchorEl(event.currentTarget);
                    setMenu(playlist);
                  }
                }}
              />
              {playlist.name === active && <div className={classes.activeBar} />}
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
          setAnchorEl(null);
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
          primary={t('action:play', { context: 'playlist' })}
          onClick={() => fetchPlaylist(
            menu._id,
            ACTION.AUDIO.PLAYLIST_SET
          )}
        />
        <ContextItem
          disableTranslation
          primary={t('action:add', { context: 'playlist' })}
          onClick={() => fetchPlaylist(
            menu._id,
            ACTION.AUDIO.PLAYLIST_ADD
          )}
        />
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

NavigationPlaylist.propTypes = {
  active: PropTypes.string,
  mixography: PropTypes.arrayOf(propPlaylist)
};

NavigationPlaylist.defaultProps = {
  mixography: [],
  active: null
};

const mapStateToProps = state => ({
  active: state.playlist.name,
  mixography: state.mixography
});

export default connect(
  mapStateToProps
)(NavigationPlaylist);
