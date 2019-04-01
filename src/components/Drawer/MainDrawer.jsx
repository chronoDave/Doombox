import React, { Fragment, useState } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import classNames from 'classnames';

// Icons
import PlaylistIcon from '@material-ui/icons/ArtTrack';
import LabelIcon from '@material-ui/icons/Album';
import AlbumIcon from '@material-ui/icons/LibraryMusic';
import SongIcon from '@material-ui/icons/QueueMusic';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import {
  DatabaseAddIcon,
  DatabaseUpdateIcon,
  DatabaseRemoveIcon
} from '../Icons';

import Typography from '../Typography/Typography';
import { GridContainer } from '../Grid';
import { SearchField } from '../Field';
import { PlayerDisplay, PlayerButtons } from '../Player';
import Collapse from '../Collapse/Collapse';
import MainDrawerList from './MainDrawerList';
import { SelectPathDialog } from '../Dialog';

// Actions
import { updateDatabase } from '../../actions/databaseActions';

// Assets
import Icon from '../../assets/icons/icon.png';

// Style
import MainDrawerStyle from './MainDrawerStyle';

const MainDrawer = props => {
  const {
    classes,
    playlist,
    onClick,
    handleSubmit,
    active,
    playlistSize,
    labelSize,
    albumSize,
    songSize,
    isEmpty,
    isBusy,
    onDelete
  } = props;

  const [open, setOpen] = useState(false);

  const views = {
    VIEW_PLAYLIST: {
      name: 'Playlist',
      icon: () => <PlaylistIcon />,
      number: playlistSize
    },
    VIEW_LABEL: {
      name: 'Label',
      icon: () => <LabelIcon />,
      number: labelSize
    },
    VIEW_ALBUM: {
      name: 'Album',
      icon: () => <AlbumIcon />,
      number: albumSize
    },
    VIEW_SONG: {
      name: 'Song',
      icon: () => <SongIcon />,
      number: songSize
    }
  };

  const options = {
    INIT_DATABASE: {
      name: 'Create database',
      icon: () => <DatabaseAddIcon />,
      func: () => setOpen(true),
      disabled: isBusy || !isEmpty
    },
    UPDATE_DATABASE: {
      name: 'Update database',
      icon: () => <DatabaseUpdateIcon />,
      func: () => '',
      disabled: isBusy || isEmpty
    },
    RESET_DATABASE: {
      name: 'Delete database',
      icon: () => <DatabaseRemoveIcon />,
      func: () => onDelete(),
      disabled: isBusy || isEmpty
    }
  };

  return (
    <Fragment>
      <div className={classNames(
        classes.root,
        classes.scrollbar
      )}>
        <List
          dense
          subheader={(
            <ListSubheader
              disableSticky
              classes={{ root: classes.listSubheaderRoot }}
            >
              <GridContainer
                direction="column"
                alignItems="center"
              >
                <img src={Icon} alt="Main application icon." />
                <Typography
                  variant="body1"
                  classes={{ root: classes.typographyTitle }}
                >
                  Doombox
                </Typography>
              </GridContainer>
            </ListSubheader>
          )}
        >
          <ListItem>
            <Form onSubmit={handleSubmit}>
              <Field
                name="search"
                component={SearchField}
              />
            </Form>
          </ListItem>
          <ListItem>
            <Collapse
              title="Playing"
              defaultExpanded
              paddingTop
            >
              <PlayerDisplay
                playlist={playlist}
                onClick={onClick}
              />
            </Collapse>
          </ListItem>
          <ListItem>
            <PlayerButtons />
          </ListItem>
          <ListItem>
            <Collapse
              title="Views"
              defaultExpanded
            >
              <MainDrawerList
                active={active}
                content={views}
                secondary="number"
              />
            </Collapse>
          </ListItem>
          <ListItem>
            <Collapse title="Setting">
              <MainDrawerList
                content={options}
                secondary="func"
              />
            </Collapse>
          </ListItem>
        </List>
      </div>
      <SelectPathDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};

export default reduxForm({
  form: 'search'
})(withStyles(MainDrawerStyle)(MainDrawer));
