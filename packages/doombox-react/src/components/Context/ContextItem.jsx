import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemText
} from '@material-ui/core';

const ContextItem = forwardRef((props, ref) => {
  const {
    primary,
    secondary,
    disableTranslation,
    disableAutoClose,
    disabled,
    onClick,
    onClose,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <ListItem
      button={!!onClick}
      onClick={event => {
        if (onClick) {
          onClick(event);
          if (!disableAutoClose) onClose();
        }
      }}
      disabled={disabled}
      ref={ref}
    >
      <ListItemText
        primary={disableTranslation ? primary : t(primary)}
        secondary={secondary ?
          (disableTranslation ? secondary : t(secondary)) :
          null
        }
        {...rest}
      />
    </ListItem>
  );
});

ContextItem.displayName = 'ContextItem';
ContextItem.propTypes = {
  disabled: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  disableTranslation: PropTypes.bool,
  disableAutoClose: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func
};

ContextItem.defaultProps = {
  secondary: null,
  disabled: false,
  disableTranslation: false,
  disableAutoClose: false,
  onClick: null,
  onClose: null
};

export default ContextItem;
