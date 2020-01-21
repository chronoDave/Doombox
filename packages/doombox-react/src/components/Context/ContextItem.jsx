import React, {
  Fragment,
  forwardRef
} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icon
import IconMenu from '@material-ui/icons/KeyboardArrowRight';

// Core
import {
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

// Styles
import { useContextStyles } from './Context.style';

const ContextItem = forwardRef((props, ref) => {
  const {
    primary,
    secondary,
    disableTranslation,
    onClick,
    divider,
    menu,
    ...rest
  } = props;

  const { t } = useTranslation();
  const classes = useContextStyles();

  return (
    <Fragment>
      <ListItem
        button={!!onClick}
        onClick={onClick}
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
        {menu && <IconMenu />}
      </ListItem>
      {divider && <Divider classes={{ root: classes.divider }} />}
    </Fragment>
  );
});

ContextItem.displayName = 'ContextItem';
ContextItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  disableTranslation: PropTypes.bool,
  onClick: PropTypes.func,
  divider: PropTypes.bool,
  menu: PropTypes.bool
};

ContextItem.defaultProps = {
  secondary: null,
  disableTranslation: false,
  onClick: null,
  divider: false,
  menu: false
};

export default ContextItem;
