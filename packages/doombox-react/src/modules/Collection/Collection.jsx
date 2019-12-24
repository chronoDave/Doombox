import React, {
  Fragment,
  useState
} from 'react';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import { IconButton } from '@material-ui/core';

import {
  ButtonAvatar,
  DialogForm
} from '../../components';

// Modules
import { FormCreatePlaylist } from '../Form';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Style
import { useCollectionStyles } from './Collection.style';

const Collection = () => {
  const [open, setOpen] = useState(false);
  const collection = useAudio(HOOK.AUDIO.COLLECTION);
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
          />
        ))}
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => setOpen(true)}
        >
          <IconAdd />
        </IconButton>
      </div>
      <DialogForm
        open={open}
        onClose={() => setOpen(false)}
        title="Wewee"
        form={<FormCreatePlaylist />}
      />
    </Fragment>
  );
};

export default Collection;
