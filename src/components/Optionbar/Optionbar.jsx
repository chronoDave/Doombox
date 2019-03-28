import React from 'react';
import { connect } from 'react-redux';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Actions
import { updateDatabase } from '../../actions/databaseActions';

// Style
import OptionbarStyle from './OptionbarStyle';

const Optionbar = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText
            primary="Doombox"
            primaryTypographyProps={{
              variant: 'h5',
              align: 'center'
            }}
          />
        </ListItem>
        <Button onClick={() => updateDatabase()}>
          REFRESH
        </Button>
        <ListItem>
          <ListItemText primary="Label" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Album" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Song" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(OptionbarStyle)(Optionbar);
