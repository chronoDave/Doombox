import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Button } from '@material-ui/core';

// Modules
import { FormCreatePlaylist } from '../../modules';

import Dialog from './Dialog.private';

const DialogCreatePlaylist = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('title:createPlaylist')}
    >
      <FormCreatePlaylist>
        <Button onClick={onClose}>
          {t('action:cancel')}
        </Button>
      </FormCreatePlaylist>
    </Dialog>
  );
};

DialogCreatePlaylist.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DialogCreatePlaylist;
