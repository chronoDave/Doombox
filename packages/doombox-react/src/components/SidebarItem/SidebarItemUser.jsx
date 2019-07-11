import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress
} from '@material-ui/core';

import { ModalCreateProfile } from '../Modal';
import { Button } from '../Button';

// Style
import SidebarItemStyle from './SidebarItemStyle';

const SidebarItemUser = props => {
  const {
    classes
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => setOpen(true)}
        disableLowercase
      >
        Create profile
      </Button>
      <ModalCreateProfile
        open={open}
        disableBackdropClick
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </Fragment>
  );
};

SidebarItemUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(
  SidebarItemStyle
)(SidebarItemUser);
