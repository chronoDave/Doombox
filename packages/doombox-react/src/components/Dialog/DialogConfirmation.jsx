import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { DialogContentText } from '@material-ui/core';

import { Button } from '../Button';

import DialogBase from './DialogBase';

const DialogConfirmation = props => {
  const {
    primary,
    onConfirm,
    onClose,
    disableAutoClose,
    ...rest
  } = props;
  const { t } = useTranslation();

  const handleClick = event => {
    onConfirm(event);
    if (!disableAutoClose) onClose();
  };

  return (
    <DialogBase
      onClose={onClose}
      actions={(
        <Fragment>
          <Button onClick={onClose}>
            {t('action:cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClick}
          >
            {t('action:delete')}
          </Button>
        </Fragment>
      )}
      {...rest}
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
  primary: PropTypes.string.isRequired,
  disableAutoClose: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

DialogConfirmation.defaultProps = {
  disableAutoClose: false
};

export default DialogConfirmation;
