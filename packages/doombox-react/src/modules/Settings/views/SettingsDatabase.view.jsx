import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconDelete from '@material-ui/icons/Delete';
import IconRescan from '@material-ui/icons/Refresh';

// Core
import {
  Box,
  List,
  IconButton,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from '@material-ui/core';

import { Button } from '../../../components/Button';

// Api
import {
  parsePaths,
  deleteLibrary,
  updateUser
} from '../../../api';

// Validtion
import { propUser } from '../../../validation/propTypes';

// Utils
import { selectFolder } from '../../../utils';
import { REDUCER } from '../../../utils/const';

const DatabaseView = props => {
  const {
    profile: {
      _id,
      folders
    },
    updateFolders,
    updateLibrary,
    clearLibrary
  } = props;
  const { t } = useTranslation();

  const handleDelete = () => {
    updateFolders(_id, []);
    clearLibrary();
  };

  const handleRemove = path => {
    const newFolders = folders.filter(folder => folder.path !== path);
    updateFolders(_id, newFolders);
  };

  const handleAdd = async () => {
    const folder = await selectFolder();
    if (folder) {
      const newFolders = [...folders || [], { path: folder }];
      updateFolders(_id, newFolders);
      updateLibrary(newFolders);
    }
  };

  return (
    <Box p={3}>
      <List
        subheader={(
          <ListSubheader disableSticky>
            {t('library')}
          </ListSubheader>
        )}
      >
        {folders && folders.map(item => (
          <ListItem key={item.path}>
            <ListItemText primary={item.path} />
            <ListItemSecondaryAction>
              <IconButton color="inherit" onClick={() => handleRemove(item.path)}>
                <IconDelete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Box display="flex" justifyContent="space-between" pt={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
            {t('delete', { context: 'folder' })}
          </Button>
          <Box display="flex">
            <Button mr={1}>
              {t('rescan')}
            </Button>
            <Button ml={1} onClick={() => handleAdd()}>
              {t('add', { context: 'folder' })}
            </Button>
          </Box>
        </Box>
      </List>
    </Box>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  clearLibrary: () => dispatch(deleteLibrary()),
  updateLibrary: path => dispatch(parsePaths(path)),
  updateFolders: (_id, folders) => dispatch(updateUser(_id, { $set: { folders } }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseView);
