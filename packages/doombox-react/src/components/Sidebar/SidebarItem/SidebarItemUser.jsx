import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// Icon
import IconPerson from '@material-ui/icons/Person';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Avatar,
  Box,
  IconButton
} from '@material-ui/core';

import { Typography } from '../../Typography';

// Utils
import { settingsPath } from '../../../paths';

// Style
import { useSidebarItemStyle } from './SidebarItem.style';

const SidebarItemUser = ({ profile, pending }) => {
  const classes = useSidebarItemStyle();

  return (
    <Fragment>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
      >
        <Avatar
          src={(!pending && profile.avatar) ? profile.avatar.path : null}
          classes={{ root: classes.avatar }}
        >
          {(pending || !profile.avatar) ? <IconPerson /> : null}
        </Avatar>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          minWidth={0}
          ml={1}
        >
          <Typography noWrap variant="body2">
            {profile.username || ''}
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
};

SidebarItemUser.propTypes = {
  profile: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  pending: state.profile.pending
});

export default connect(
  mapStateToProps
)(SidebarItemUser);
