import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  DialogContentText,
  DialogActions
} from '@material-ui/core';

import { Button } from '../Button';

import DialogBase from './DialogBase';

const DialogConfirm = props => {
  const {
    onConfirm,
    item,
    open,
    onClose
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={() => (
        <Fragment>
          {`${t('action:delete')} `}
          <b>{item}</b>
        </Fragment>
      )}
    >
      <DialogContentText>
        {`${t('description:delete')} `}
        <b>{item}</b>
        ?
      </DialogContentText>
      <DialogActions>
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
      </DialogActions>
    </DialogBase>
  );
};

DialogConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

DialogConfirm.defaultProps = {
  open: false
};

export default DialogConfirm;
