import React, { Fragment, useState } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

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
import { setView } from '../../actions/windowActions';

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
    changeView,
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
      func: () => changeView(VIEW_PLAYLIST),
      number: playlistSize
    },
    VIEW_LABEL: {
      name: 'Label',
      icon: () => <LabelIcon />,
      func: () => changeView(VIEW_LABEL),
      number: labelSize
    },
    VIEW_ALBUM: {
      name: 'Album',
      icon: () => <AlbumIcon />,
      func: () => changeView(VIEW_ALBUM),
      number: albumSize
    },
    VIEW_SONG: {
      name: 'Song',
      icon: () => <SongIcon />,
      func: () => changeView(VIEW_SONG),
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
                secondary={["number", "func"]}
              />
            </Collapse>
          </ListItem>
          <ListItem>
            <Collapse title="Setting">
              <MainDrawerList
                content={options}
                secondary={["func"]}
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

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.array,
  onClick: PropTypes.func,
  handleSubmit: PropTypes.func,
  changeView: PropTypes.func,
  active: PropTypes.string,
  playlistSize: PropTypes.number,
  labelSize: PropTypes.number,
  albumSize: PropTypes.number,
  songSize: PropTypes.number,
  isEmpty: PropTypes.bool,
  isBusy: PropTypes.bool,
  onDelete: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  changeView: view => dispatch(setView(view))
});

export default reduxForm({
  form: 'search'
})(connect(
  null,
  mapDispatchToProps
)(withStyles(MainDrawerStyle)(MainDrawer)));
