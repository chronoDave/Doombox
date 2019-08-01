import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icon
import IconAdd from '@material-ui/icons/Add';

// Core
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText
} from '@material-ui/core';

import { Button } from '../../../components/Button';
import { DialogUpdateConnection } from '../../../components/Dialog';

// Utils
import { selectFolder } from '../../../utils';

const ConnectionsView = ({ user }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleFolderSelect = async () => {
    const folder = await selectFolder();
    // TODO
  };

  return (
    <Fragment>
      <Card>
        <Box p={1}>
          <List dense>
            <ListSubheader disableSticky>
              MongoDB
            </ListSubheader>
            <ListItem>
              <ListItemText primary={user.database} />
              <Button
                variant="contained"
                color="primary"
                BoxProps={{ ml: 3 }}
                onClick={() => setOpen(true)}
              >
                {t('edit')}
              </Button>
            </ListItem>
            <ListSubheader disableSticky>
              Library
            </ListSubheader>
            {(user.folders && user.folders.length !== 0) && (
              user.folders.map(folder => (
                <ListItem key={folder.path}>
                  <ListItemText
                    primary={folder.path}
                    secondary={folder.watch}
                  />
                </ListItem>
              ))
            )}
            <ListItem button onClick={handleFolderSelect}>
              <ListItemIcon>
                <IconAdd />
              </ListItemIcon>
              <ListItemText primary={t('add', { context: 'folder' })} />
            </ListItem>
          </List>
        </Box>
      </Card>
      <DialogUpdateConnection
        open={open}
        address={user.database}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </Fragment>
  );
};

ConnectionsView.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(ConnectionsView);
