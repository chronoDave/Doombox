const CollapseStyle = theme => ({
  expansionPanelRoot: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: 'initial',
    margin: '0 !important'
  },
  expansionPanelSummaryRoot: {
    padding: theme.spacing(1),
    minHeight: 0
  },
  expansionPanelSummaryExpandIcon: {
    padding: 0,
    color: theme.palette.grey[50]
  },
  expansionPanelSummaryContent: {
    margin: 0
  },
  expansionPanelExpanded: {
    minHeight: '0 !important',
    '& div': {
      margin: '0 !important'
    }
  },
  expansionPanelDetails: {
    padding: 0
  }
});

export default CollapseStyle;
