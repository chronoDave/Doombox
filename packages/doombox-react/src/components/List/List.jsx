import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  List as MuiList,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// Style
import { useListStyle } from './List.style';

const List = ({ active, items }) => {
  const { t } = useTranslation();
  const classes = useListStyle();

  return (
    <MuiList>
      {items.map(({
        key,
        icon,
        onClick,
        tProps
      }) => (
        key.includes('title') ? (
          <ListSubheader
            key={key}
            disableSticky
            classes={{ root: classes.subheaderRoot }}
          >
            <strong>{t(key, tProps).toUpperCase()}</strong>
          </ListSubheader>
        ) : (
          <ListItem
            key={key}
            button={!!onClick}
            onClick={onClick}
            classes={{ root: classes.itemRoot }}
            className={active === key ? classes.itemActive : null}
          >
            {icon && (
              <ListItemIcon>
                {icon}
              </ListItemIcon>
            )}
            <ListItemText primary={t(key, tProps)} />
          </ListItem>
        )
      ))}
    </MuiList>
  );
};

List.propTypes = {
  active: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node,
      tProps: PropTypes.object,
      onClick: PropTypes.func
    })
  ).isRequired
};

List.defaultProps = {
  active: null
};

export default List;
