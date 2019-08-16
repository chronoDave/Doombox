import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconAdd from '@material-ui/icons/Add';
import IconDelete from '@material-ui/icons/Close';

// Core
import {
  Box,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText
} from '@material-ui/core';

// Api
import { scanLibrary } from '../../../api/libraryApi';
import { updateUser } from '../../../api/userApi';

// Validation
import { propUser } from '../../../validation/propTypes';

// Utils
import { selectFolder } from '../../../utils';

const ConnectionsView = props => {
  const {
    user,
    updateLibrary,
    updateConnections,
    scanning
  } = props;
  const { t } = useTranslation();

  const handleFolderSelect = async () => {
    const path = await selectFolder();
    if (!path) return null;
    if (
      user.library &&
      user.library.filter(item => path.includes(item.path)).length !== 0
    ) return null; // TODO: Throw error
    updateConnections(
      user._id,
      { library: [...user.library || [], { path }] }
    );
    return updateLibrary([...user.library || [], { path }]);
  };

  const handleDelete = path => {
    const newLibrary = user.library.filter(item => item.path !== path);
    updateConnections(user._id, { library: newLibrary });
  };

  return (
    <Fragment>
      <Card>
        <Box p={1}>
          <List dense>
            <ListSubheader>
              {t('library')}
            </ListSubheader>
            {(user.library && user.library.length !== 0) && (
              user.library.map(item => (
                <ListItem
                  key={item.key || item.path}
                  disabled={scanning}
                >
                  <ListItemText primary={item.path} />
                  <IconButton
                    onClick={() => handleDelete(item.path)}
                    disabled={scanning}
                  >
                    <IconDelete />
                  </IconButton>
                </ListItem>
              ))
            )}
            <ListItem
              button
              onClick={handleFolderSelect}
              disabled={scanning}
            >
              <ListItemIcon>
                <IconAdd />
              </ListItemIcon>
              <ListItemText primary={t('add')} />
            </ListItem>
          </List>
        </Box>
      </Card>
    </Fragment>
  );
};

ConnectionsView.propTypes = {
  user: propUser.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  updateConnections: PropTypes.func.isRequired,
  scanning: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  scanning: state.library.pending,
  user: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  updateLibrary: paths => dispatch(scanLibrary(paths)),
  updateConnections: (id, values) => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionsView);
