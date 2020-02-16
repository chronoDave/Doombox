import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

// Utils
import { selectFolder } from '../../../utils';

// Style
import { useFieldFolderStyles } from './FieldFolder.style';

const FieldFolderBase = props => {
  const {
    value,
    multi,
    onChange,
    secondaryAction
  } = props;

  const { t } = useTranslation();
  const classes = useFieldFolderStyles();

  const handleClick = () => {
    selectFolder(multi)
      .then(folders => {
        if (folders) onChange(folders);
      })
      .catch(console.error);
  };

  return (
    <List>
      {value.map(folder => (
        <ListItem
          key={folder}
          classes={{ root: classes.listItem }}
        >
          <ListItemText
            primary={folder}
            primaryTypographyProps={{ display: 'block' }}
          />
          {secondaryAction(folder)}
        </ListItem>
      ))}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <IconAdd />
        </ListItemIcon>
        <ListItemText primary={t('action:add', { context: 'folder' })} />
      </ListItem>
    </List>
  );
};

FieldFolderBase.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  secondaryAction: PropTypes.func
};

FieldFolderBase.defaultProps = {
  multi: false,
  secondaryAction: null
};

export default FieldFolderBase;
