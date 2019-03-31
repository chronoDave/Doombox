import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';

// Icons
import PlaylistIcon from '@material-ui/icons/ArtTrack';
import LabelIcon from '@material-ui/icons/Album';
import AlbumIcon from '@material-ui/icons/LibraryMusic';
import SongIcon from '@material-ui/icons/QueueMusic';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

import Typography from '../Typography/Typography';
import { GridContainer } from '../Grid';
import { SearchField } from '../Field';
import { PlayerDisplay, PlayerButtons } from '../Player';
import Divider from '../Divider/Divider';
import Collapse from '../Collapse/Collapse';

// Actions
import { updateDatabase } from '../../actions/databaseActions';

// Types
import {
  VIEW_PLAYLIST,
  VIEW_LABEL,
  VIEW_ALBUM,
  VIEW_SONG
} from '../../actionTypes/windowTypes';

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
    songSize
  } = props;

  const views = {
    VIEW_PLAYLIST: {
      name: 'Playlist',
      icon: () => <PlaylistIcon />,
      size: playlistSize
    },
    VIEW_LABEL: {
      name: 'Label',
      icon: () => <LabelIcon />,
      size: labelSize
    },
    VIEW_ALBUM: {
      name: 'Album',
      icon: () => <AlbumIcon />,
      size: albumSize
    },
    VIEW_SONG: {
      name: 'Song',
      icon: () => <SongIcon />,
      size: songSize
    }
  };

  const renderViewList = () => (
    <List
      disablePadding
      classes={{ root: classes.listRoot }}
    >
      {Object.keys(views).map(key => (
        <ListItem
          key={key}
          disableGutters
          classes={{ root: classes.listItemRoot }}
        >
          <ListItemAvatar
            classes={{ root: classes.listItemAvatarRoot }}
            className={key === active && classes.active}
          >
            {views[key].icon()}
          </ListItemAvatar>
          <ListItemText
            primary={views[key].name}
            primaryTypographyProps={{ color: 'inherit' }}
            classes={{
              primary: key === active ? classes.active : undefined
            }}
          />
          <ListItemSecondaryAction>
            <Typography
              variant="body2"
              color="inherit"
              classes={{
                root: key === active ? classes.active : classes.listItemSecondaryActionTypography
              }}
            >
              {views[key].size}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div className={classes.root}>
      <List
        dense
        subheader={(
          <ListSubheader classes={{ root: classes.listSubheaderRoot }}>
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
            {renderViewList()}
          </Collapse>
        </ListItem>
      </List>
    </div>
  );
};

export default reduxForm({
  form: 'search'
})(withStyles(MainDrawerStyle)(MainDrawer));
