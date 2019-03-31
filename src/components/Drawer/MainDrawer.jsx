import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

// Assets
import Icon from '../../assets/icons/icon.png';

// Style
import MainDrawerStyle from './MainDrawerStyle';

const MainDrawer = props => {
  const { classes, playlist, onClick, handleSubmit } = props;

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
          <Collapse title="Playing">
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
          <Divider light />
        </ListItem>
      </List>
    </div>
  );
};

export default reduxForm({
  form: 'search'
})(withStyles(MainDrawerStyle)(MainDrawer));
