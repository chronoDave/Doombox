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
  const { classes, title, children, defaultExpanded, paddingTop } = props;

  return (
    <ExpansionPanel
      defaultExpanded={defaultExpanded}
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
      <ExpansionPanelDetails
        classes={{ root: classes.expansionPanelDetails }}
        className={paddingTop ? classes.paddingTop : undefined}
      >
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Collapse.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  paddingTop: PropTypes.bool
};

export default withStyles(CollapseStyle)(Collapse);
