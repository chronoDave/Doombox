import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { DialogContentText } from '@material-ui/core';

import { Button } from '../../components';

import DialogBase from './DialogBase';

const DialogConfirmation = props => {
  const {
    onConfirm,
    primary,
    title,
    open,
    onClose
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={title || t('action:delete')}
      actions={(
        <Fragment>
          <Button onClick={onClose}>
            {t('action:cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            {t('action:delete')}
          </Button>
        </Fragment>
      )}
    >
      <DialogContentText>
        {`${t('description:delete')} `}
        <b>{primary}</b>
        ?
      </DialogContentText>
    </DialogBase>
  );
};

DialogConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  primary: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

DialogConfirmation.defaultProps = {
  title: null,
  open: false,
  primary: ''
};

export default DialogConfirmation;
