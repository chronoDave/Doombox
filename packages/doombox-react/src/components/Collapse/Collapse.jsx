import React from 'react';
import PropTypes from 'prop-types';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';

import { Typography } from '../Typography';

// Style
import CollapseStyle from './CollapseStyle';

const Collapse = props => {
  const {
    classes,
    title,
    children,
    ...rest
  } = props;

  return (
    <ExpansionPanel
      {...rest}
      classes={{ root: classes.expansionPanelRoot }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          root: classes.expansionPanelSummaryRoot,
          expandIcon: classes.expansionPanelSummaryExpandIcon,
          content: classes.expansionPanelSummaryContent
        }}
        className={classes.expansionPanelExpanded}
      >
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Collapse.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(
  CollapseStyle
)(Collapse);
