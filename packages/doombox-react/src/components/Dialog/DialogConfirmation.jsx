import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { DialogContentText } from '@material-ui/core';

import { Button } from '../Button';

import DialogBase from './DialogBase';

const DialogConfirmation = props => {
  const {
    onConfirm,
    item,
    title,
    open,
    onClose,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={title}
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
      {...rest}
    >
      <DialogContentText>
        {`${t('description:delete')} `}
        <b>{item}</b>
        ?
      </DialogContentText>
    </DialogBase>
  );
};

DialogConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DialogConfirmation;
