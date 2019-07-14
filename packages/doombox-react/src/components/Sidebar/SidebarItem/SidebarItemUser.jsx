import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// Icon
import IconPerson from '@material-ui/icons/Person';
import IconSettings from '@material-ui/icons/Settings';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  IconButton
} from '@material-ui/core';

import { DialogCreateProfile } from '../../Dialog';
import { Button } from '../../Button';
import { Typography } from '../../Typography';

// Actions
import { getCachedUser } from '../../../actions/userActions';

// Utils
import { settingsPath } from '../../../paths';

// Style
import SidebarItemStyle from './SidebarItemStyle';

const SidebarItemUser = props => {
  const {
    profile,
    cache,
    classes,
    getProfile
  } = props;
  const [open, setOpen] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  if (cache) {
    const { avatar, username } = profile;

    return (
      <Fragment>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
        >
          <Avatar
            src={avatar ? avatar.path : null}
            classes={{ root: classes.avatar }}
          >
            {!avatar ? <IconPerson /> : null}
          </Avatar>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            minWidth={0}
            ml={1}
          >
            <Typography noWrap variant="body2">
              {username}
            </Typography>
          </Box>
          <IconButton
            component={RouterLink}
            classes={{ root: classes.iconSmall }}
            to={settingsPath}
          >
            <IconSettings />
          </IconButton>
        </Box>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => setOpen('createProfile')}
      >
        Create profile
      </Button>
      <DialogCreateProfile
        open={open === 'createProfile'}
        disableBackdropClick
        onClose={() => setOpen(null)}
        onCancel={() => setOpen(null)}
      />
    </Fragment>
  );
};

SidebarItemUser.propTypes = {
  cache: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cache: state.profile.cache,
  profile: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getCachedUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(
  SidebarItemStyle
)(SidebarItemUser));
