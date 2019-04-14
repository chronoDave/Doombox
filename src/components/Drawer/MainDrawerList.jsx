import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

import Typography from '../Typography/Typography';

// Style
import MainDrawerListStyle from './MainDrawerListStyle';

const MainDrawerList = props => {
  const { content, classes, active, secondary } = props;
  return (
    <List
      disablePadding
      classes={{ root: classes.root }}
    >
      {Object.keys(content).map(key => (
        <ListItem
          key={key}
          disableGutters
          classes={{ root: classes.listItemRoot }}
          button={secondary.includes('func')}
          onClick={() => secondary.includes('func') && content[key].func()}
          disabled={content[key].disabled}
        >
          <ListItemAvatar
            classes={{ root: classes.listItemAvatarRoot }}
            className={key === active ? classes.active : undefined}
          >
            <Avatar classes={{ root: classes.avatar }}>
              {content[key].icon()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={content[key].name}
            primaryTypographyProps={{ color: 'inherit' }}
            classes={{
              primary: key === active ? classes.active : undefined
            }}
          />
          {secondary.includes('number') && (
            <ListItemSecondaryAction>
              <Typography
                variant="body2"
                color="inherit"
                classes={{
                  root: key === active ? classes.active : classes.listItemSecondaryActionTypography
                }}
              >
                {content[key].number}
              </Typography>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
};

MainDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  active: PropTypes.string,
  secondary: PropTypes.array.isRequired
};

export default withStyles(MainDrawerListStyle)(MainDrawerList);
