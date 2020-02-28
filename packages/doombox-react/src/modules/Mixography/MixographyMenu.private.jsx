import React from 'react';
import { ACTION } from '@doombox/utils';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Context,
  ContextItem,
  ContextDivider
} from '../../components';

// Actions
import { fetchPlaylist } from '../../actions';

// Validation
import { propPlaylist } from '../../validation/propTypes';

const MixographyMenu = props => {
  const {
    onClose,
    onDialog,
    menu: { anchorEl, playlist }
  } = props;
  const { t } = useTranslation();

  const handleDialog = id => {
    onDialog({
      id,
      playlist: {
        ...playlist,
        src: {
          path: playlist.src
        }
      }
    });
    onClose();
  };

  return (
    <Context
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <ContextItem
        disableTranslation
        primary={t('action:play', { context: 'playlist' })}
        onClick={() => fetchPlaylist(
          playlist._id,
          ACTION.AUDIO.PLAYLIST_SET
        )}
      />
      <ContextItem
        disableTranslation
        primary={t('action:add', { context: 'playlist' })}
        onClick={() => fetchPlaylist(
          playlist._id,
          ACTION.AUDIO.PLAYLIST_ADD
        )}
      />
      <ContextDivider />
      <ContextItem
        disableTranslation
        primary={t('action:edit', { context: 'playlist' })}
        onClick={() => handleDialog('update')}
      />
      <ContextItem
        disableTranslation
        primary={t('action:delete', { context: 'playlist' })}
        primaryTypographyProps={{ color: 'error' }}
        onClick={() => handleDialog('delete')}
      />
    </Context>
  );
};

MixographyMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDialog: PropTypes.func.isRequired,
  menu: PropTypes.shape({
    anchorEl: PropTypes.shape({}),
    playlist: propPlaylist
  }).isRequired
};

export default MixographyMenu;
