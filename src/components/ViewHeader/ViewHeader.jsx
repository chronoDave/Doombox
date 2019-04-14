import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '../Typography/Typography';
import Divider from '../Divider/Divider';
import { GridContainer } from '../Grid';

// Style
import ViewHeaderStyle from './ViewHeaderStyle';

const ViewHeader = props => {
  const { classes, size, type, title, children } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">{`${size} ${type}`}</Typography>
      <Divider light padding />
      <GridContainer
        wrap="nowrap"
        alignItems="center"
      >
        {children}
      </GridContainer>
    </div>
  );
};

ViewHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number,
  children: PropTypes.node,
  type: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(ViewHeaderStyle)(ViewHeader);
