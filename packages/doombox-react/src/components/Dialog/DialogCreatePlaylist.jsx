import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

import { FormCreatePlaylist } from '../Form';

const DialogCreatePlaylist = ({ onClose, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      disableBackdropClick
      onClose={onClose}
      {...rest}
    >
      <DialogTitle>
        {t('title:create', { context: 'playlist' })}
      </DialogTitle>
      <DialogContent>
        <FormCreatePlaylist onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

DialogCreatePlaylist.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default DialogCreatePlaylist;
