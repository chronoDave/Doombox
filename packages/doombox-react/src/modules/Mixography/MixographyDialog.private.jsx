import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
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

// Validation
import { propPlaylist } from '../../validation/propTypes';

const MixographyDialog = ({ onClose, dialog: { id, playlist } }) => {
  const { t } = useTranslation();

  const initialValues = {
    name: playlist.name,
    src: playlist.src
  };

  return (
    <Fragment>
      <DialogForm
        open={id === 'create'}
        disableTranslation
        title={t('action:create', { context: 'playlist' })}
        onClose={onClose}
        onSubmit={payload => {
          createPlaylist(payload);
          onClose();
        }}
        form={<FormPlaylist />}
      />
      <DialogForm
        open={id === 'update'}
        disableTranslation
        title={t('action:edit', { context: 'playlist' })}
        onClose={onClose}
        onSubmit={payload => {
          updatePlaylist(playlist._id, payload);
          onClose();
        }}
        form={<FormPlaylist initialValues={initialValues} />}
      />
      <DialogConfirmation
        open={id === 'delete'}
        title={t('action:delete', { context: 'playlist' })}
        primary={playlist.name}
        onClose={onClose}
        onConfirm={() => {
          deletePlaylist(playlist._id);
          onClose();
        }}
      />
    </Fragment>
  );
};

MixographyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  dialog: PropTypes.shape({
    id: PropTypes.string,
    playlist: propPlaylist
  }).isRequired
};

export default MixographyDialog;
