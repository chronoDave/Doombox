const CollapseStyle = theme => ({
  expansionPanelRoot: {
    width: '100%',
    boxShadow: 'none',
    backgroundColor: 'initial'
  },
  expansionPanelSummaryRoot: {
    padding: theme.spacing.unit,
    minHeight: 0,
    borderTop: `1px solid ${theme.palette.getAlpha(theme.palette.grey[50], 0.1)}`,
    borderBottom: `1px solid ${theme.palette.getAlpha(theme.palette.grey[50], 0.1)}`
  },
  expansionPanelSummaryExpandIcon: {
    padding: 0,
    color: theme.palette.grey[50]
  },
  expansionPanelSummaryContent: {
    margin: 0
  },
  expansionPanelExpanded: {
    minHeight: `0 !important`,
    '& div': {
      margin: '0 !important'
    }
  },
  paddingTop: {
    paddingTop: `${theme.spacing.unit * 2}px !important`
  },
  expansionPanelDetails: {
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.getAlpha(theme.palette.grey[50], 0.1)}`
  }
});

export default CollapseStyle;
