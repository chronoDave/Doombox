import React from 'react';
import PropTypes from 'prop-types';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Typography from '../Typography/Typography';

// Style
import CollapseStyle from './CollapseStyle';

const Collapse = props => {
  const { classes, title, children } = props;

  return (
    <ExpansionPanel
      defaultExpanded
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
        <Typography variant="body1">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Collapse.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};

export default withStyles(CollapseStyle)(Collapse);
