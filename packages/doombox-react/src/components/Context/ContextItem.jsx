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
    disabled,
    onClick,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <ListItem
      button={!!onClick}
      onClick={onClick}
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
  onClick: PropTypes.func
};

ContextItem.defaultProps = {
  secondary: null,
  disabled: false,
  disableTranslation: false,
  onClick: null
};

export default ContextItem;
