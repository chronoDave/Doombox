import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Img from 'react-image';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress
} from '@material-ui/core';

import { ModalCreateProfile } from '../Modal';
import { Button } from '../Button';

// Actions
import { fetchUser } from '../../actions/fetchActions';

// Style
import SidebarItemStyle from './SidebarItemStyle';

const SidebarItemUser = props => {
  const {
    classes,
    user,
  } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <CircularProgress />;
  if (Object.keys(user).length === 0) {
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
  }
  return <div>a</div>
  // return (
  //   isNew ? (
  //     
  //   ) : (
  //       <Box
  //       width="100%"
  //     >
  //       <Img
  //         className={classes.avatar}
  //         src={[
  //           user.avatar.path,
  //           'https://chrono.s-ul.eu/DaASwsS2'
  //         ]}
  //         loader={<CircularProgress size={20} />}
  //       />
  //     </Box>
  //   )
};

const mapStateToProps = state => ({
  user: state.user
});

SidebarItemUser.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

SidebarItemUser.defaultProps = {
  user: {}
};

export default connect(
  mapStateToProps
)(withStyles(
  SidebarItemStyle
)(SidebarItemUser));
