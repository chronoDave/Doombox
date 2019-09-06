import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

import { Button } from '../../../components/Button';

// Api
import {
  scanLibrary,
  updateUser
} from '../../../api';

// Validtion
import { propUser } from '../../../validation/propTypes';

// Utils
import { selectFolder } from '../../../utils';

const DatabaseView = props => {
  const {
    user,
    updateLibrary,
    updateConnections
  } = props;
  const { t } = useTranslation();

  const handleSelect = async () => {
    const path = await selectFolder();
    if (!path) return null;
    if (user.library && user.library.filter(item => path.includes(item.path)).length !== 0) {
      // Don't allow nested folders (only scan root)
      return null; // TODO: Throw error
    }
    updateConnections(user._id, { library: [{ path }] });
    return updateLibrary([{ path }]);
  };

  return (
    <Box p={3}>
      {t('library')}
      <List>
        {user.library && user.library.map(item => (
          <ListItem key={item.key || item.path}>
            <ListItemText primary={item.path} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSelect()}
      >
        {t('add_folder')}
      </Button>
    </Box>
  );
};

DatabaseView.propTypes = {
  user: propUser.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  updateConnections: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  updateLibrary: paths => dispatch(scanLibrary(paths)),
  updateConnections: (id, values) => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseView);
