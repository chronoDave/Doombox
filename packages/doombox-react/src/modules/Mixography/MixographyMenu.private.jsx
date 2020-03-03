import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Context,
  ContextItem,
  ContextDivider
} from '../../components';

// Actions
import {
  playPlaylist,
  addPlaylist
} from '../../actions';

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
    onDialog({ id, playlist });
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
        onClick={() => playPlaylist(playlist._id)}
      />
      <ContextItem
        disableTranslation
        primary={t('action:add', { context: 'playlist' })}
        onClick={() => addPlaylist(playlist._id)}
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
