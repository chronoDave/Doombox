import React, {
  useState,
  Fragment
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import IconPlaylist from '@material-ui/icons/PlaylistPlay';
import IconAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Tooltip } from '../../components/Tooltip';
import { DialogCreatePlaylist } from '../../components/Dialog';
import { Avatar } from '../../components/Avatar';
import { ContextPlaylist } from '../../components/Context';

// Hooks
import { useRoute } from '../../hooks';

// Validation
import { propPlaylist } from '../../validation/propTypes';

// Utils
import { MAIN_VIEWS } from '../../utils/const';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarPlaylist = ({ playlist, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [{ anchorEl, current }, setContext] = useState({});
  const { setView } = useRoute();
  const classes = useSidebarStyle();

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        {...rest}
      >
        {playlist.map(collection => (
          <Tooltip
            title={collection.title}
            key={collection._id}
            placement="right"
          >
            <IconButton
              onClick={() => setView(MAIN_VIEWS.PLAYLIST)}
              onContextMenu={({ currentTarget }) => setContext({
                anchorEl: currentTarget,
                current: collection
              })}
            >
              <Avatar
                src={collection.image ? collection.image.path : null}
                disableFallback
              >
                <IconPlaylist />
              </Avatar>
            </IconButton>
          </Tooltip>
        ))}
        <Tooltip title="Create new playlist" placement="right">
          <IconButton onClick={() => setOpen(true)}>
            <IconAdd classes={{ root: classes.iconRoot }} />
          </IconButton>
        </Tooltip>
      </Box>
      <ContextPlaylist
        anchorEl={anchorEl}
        current={current}
        onClose={() => setContext({})}
      />
      <DialogCreatePlaylist
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};

SidebarPlaylist.propTypes = {
  playlist: PropTypes.arrayOf(propPlaylist).isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist.collection
});

export default connect(
  mapStateToProps
)(SidebarPlaylist);
