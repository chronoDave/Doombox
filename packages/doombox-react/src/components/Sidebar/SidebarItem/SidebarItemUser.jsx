import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Avatar } from '../../Avatar';
import { Typography } from '../../Typography';
import { useRouter } from '../../Router';

// Paths
import { SETTINGS_PATH } from '../../../paths';

// Style
import { useSidebarItemStyle } from './SidebarItem.style';

const SidebarItemUser = ({ username }) => {
  const classes = useSidebarItemStyle();
  const { setPath } = useRouter();

  return (
    <Fragment>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
      >
        <Avatar />
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          minWidth={0}
          ml={1}
        >
          <Typography noWrap variant="body2">
            {username || ''}
          </Typography>
        </Box>
        <IconButton
          classes={{ root: classes.iconSmall }}
          onClick={() => setPath(SETTINGS_PATH)}
        >
          <IconSettings />
        </IconButton>
      </Box>
    </Fragment>
  );
};

SidebarItemUser.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  username: state.profile.user.username
});

export default connect(
  mapStateToProps
)(SidebarItemUser);
