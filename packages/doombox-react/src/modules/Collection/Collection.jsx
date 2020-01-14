import React, {
  Fragment,
  useState
} from 'react';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import {
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

import {
  Typography,
  ButtonAvatar,
  DialogConfirm,
  DialogForm
} from '../../components';

// Modules
import { FormCreatePlaylist } from '../Form';
import { PopoverContext } from '../Popover';

// Actions
import { deletePlaylist } from '../../actions';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useCollectionStyles } from './Collection.style';

const Collection = () => {
  const [data, setData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState(null);
  const collection = useAudio(HOOK.AUDIO.COLLECTION);
  const { setPlaylist } = useAudio(HOOK.AUDIO.METHOD);
  const classes = useCollectionStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        {collection.map(playlist => (
          <ButtonAvatar
            key={playlist._id}
            title={playlist.name}
            src={playlist.src}
            className={classes.avatar}
            onClick={() => setPlaylist(playlist.name, playlist.collection, playlist.src)}
            onContextMenu={event => {
              setData({ _id: playlist._id, name: playlist.name });
              setAnchorEl(event.currentTarget);
            }}
          />
        ))}
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => setDialog('create')}
        >
          <IconAdd />
        </IconButton>
      </div>
      <DialogForm
        open={dialog === 'create'}
        onClose={() => setDialog(null)}
        title="Create playlist"
        form={<FormCreatePlaylist />}
      />
      <DialogConfirm
        open={dialog === 'delete'}
        onClose={() => {
          setDialog(null);
          setAnchorEl(null);
          setData({});
        }}
        onConfirm={() => {
          setDialog(null);
          setAnchorEl(null);
          deletePlaylist(data._id);
          setData({});
        }}
        item={data.name}
      />
      <PopoverContext
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <List dense>
          <ListItem button onClick={() => setDialog('edit')}>
            <ListItemText
              disableTypography
              primary={<Typography>Edit</Typography>}
            />
          </ListItem>
          <ListItem button onClick={() => setDialog('delete')}>
            <ListItemText
              disableTypography
              primary={<Typography color="error">Delete</Typography>}
            />
          </ListItem>
        </List>
      </PopoverContext>
    </Fragment>
  );
};

export default Collection;
