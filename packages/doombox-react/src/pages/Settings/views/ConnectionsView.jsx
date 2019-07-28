import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  Card,
  List,
  ListItem,
  ListSubheader,
  ListItemText
} from '@material-ui/core';

import { Button } from '../../../components/Button';
import { DialogUpdateConnection } from '../../../components/Dialog';

const ConnectionsView = ({ address }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card>
        <Box p={1}>
          <List dense>
            <ListSubheader disableSticky>
              MongoDB
            </ListSubheader>
            <ListItem>
              <ListItemText primary={address} />
              <Button
                variant="contained"
                color="primary"
                BoxProps={{ ml: 3 }}
                onClick={() => setOpen(true)}
              >
                {t('edit')}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Card>
      <DialogUpdateConnection
        open={open}
        address={address}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </Fragment>
  );
};

ConnectionsView.propTypes = {
  address: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  address: state.profile.user.connection
});

export default connect(
  mapStateToProps
)(ConnectionsView);
