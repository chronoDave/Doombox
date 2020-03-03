import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Button,
  DialogBase,
  DialogConfirmation
} from '../../components';

import { FormPlaylist } from '../Form';

// Actions
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist
} from '../../actions';

// Validation
import { propPlaylist } from '../../validation/propTypes';

const MixographyDialog = ({ onClose, dialog: { id, playlist } }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <DialogBase
        open={id === 'create'}
        disableTranslation
        title={t('action:create', { context: 'playlist' })}
        onClose={onClose}
      >
        <FormPlaylist
          submit="create"
          onSubmit={payload => {
            createPlaylist(payload);
            onClose();
          }}
          actions={(
            <Button onClick={() => onClose()}>
              {t('action:cancel')}
            </Button>
          )}
        />
      </DialogBase>
      <DialogBase
        open={id === 'update'}
        disableTranslation
        title={t('action:edit', { context: 'playlist' })}
        onClose={onClose}
      >
        <FormPlaylist
          submit="update"
          initialValues={{
            name: playlist.name,
            cover: playlist.cover
          }}
          onSubmit={payload => {
            updatePlaylist(playlist._id, payload);
            onClose();
          }}
          actions={(
            <Button onClick={() => onClose()}>
              {t('action:cancel')}
            </Button>
          )}
        />
      </DialogBase>
      <DialogConfirmation
        open={id === 'delete'}
        disableTranslation
        title={t('action:delete', { context: 'playlist' })}
        item={playlist.name}
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
